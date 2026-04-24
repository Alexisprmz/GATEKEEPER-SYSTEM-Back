import { Request, Response } from 'express'
import Solicitud from '../models/Solicitud.model'

export const solicitarAcceso = async (req: Request, res: Response): Promise<void> => {
    console.log('------- solicitarAcceso -------')
    try {
        const { email, folio } = req.body

        if (!email || !folio) {
            console.log('FALLO: email o folio incompletos')
            res.status(400).json({ error: 'Email y folio son requeridos' })
            return
        }

        const folioEnUso = await Solicitud.findOne({ 
            where: { 
                folio: folio
            } 
        })

        if (folioEnUso && folioEnUso.email !== email) {
            console.log(`ALERTA: El folio ${folio} ya está siendo usado por ${folioEnUso.email}`);
            res.status(400).json({ 
                error: 'Este folio ya ha sido registrado por otro usuario. Si crees que es un error, contacta a soporte.' 
            })
            return
        }

        let solicitud = await Solicitud.findOne({ where: { email } })

        if (solicitud) {
            console.log('Actualizando folio para email existente:', email)
            solicitud.folio = folio
            solicitud.estatus = 'Procesando'
            await solicitud.save()
        } else {
            console.log('Creando nueva solicitud para:', email)
            solicitud = await Solicitud.create({ email, folio, estatus: 'Procesando' })
        }

        const webhookUrl = process.env.N8N_WEBHOOK_URL
        if (webhookUrl) {
            try {
                const controller = new AbortController()
                const timeout = setTimeout(() => controller.abort(), 5000)

                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, folio }),
                    signal: controller.signal
                })

                clearTimeout(timeout)
                console.log('Webhook n8n enviado con éxito')
            } catch (err) {
                console.error('Error al contactar n8n:', err)
            }
        }

        res.status(201).json({ message: 'Solicitud en proceso', data: solicitud })

    } catch (error) {
        console.error('ERROR en solicitarAcceso:', error)
        res.status(500).json({ error: 'Hubo un error al procesar la solicitud' })
    }
}

export const verificarEstatus = async (req: Request, res: Response): Promise<void> => {
    console.log('------- verificarEstatus -------')
    try {
        const email = req.params.email as string 

        if (!email) {
            console.log('FALLO: email no presente en params')
            res.status(400).json({ error: 'El email es requerido' })
            return
        }

        const emailDecoded = decodeURIComponent(email)
        console.log('Email decodificado para búsqueda:', emailDecoded)

        const solicitud = await Solicitud.findOne({ where: { email: emailDecoded } })

        if (!solicitud) {
            console.log(`Resultado: No se encontró solicitud para ${emailDecoded}`)
            res.status(404).json({ error: 'Solicitud no encontrada' })
            return
        }

        console.log(`Estatus enviado: ${solicitud.estatus}`)
        res.json({ estatus: solicitud.estatus })

    } catch (error) {
        console.error('ERROR en verificarEstatus:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

export const actualizarEstatus = async (req: Request, res: Response): Promise<void> => {
    console.log('------- actualizarEstatus (n8n) -------')
    try {
        const { email, estatus } = req.body

        const solicitud = await Solicitud.findOne({ where: { email } })

        if (!solicitud) {
            console.log('n8n intentó actualizar un email inexistente:', email)
            res.status(404).json({ error: 'Solicitud no encontrada' })
            return
        }

        solicitud.estatus = estatus
        await solicitud.save()
        console.log(`[EXITO] Email ${email} cambiado a ${estatus}`)

        res.json({ message: 'Estatus actualizado', data: solicitud })
    } catch (error) {
        console.error('ERROR en actualizarEstatus:', error)
        res.status(500).json({ error: 'Error al actualizar estatus' })
    }
}