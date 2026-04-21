import { Request, Response } from 'express'
import Solicitud from '../models/Solicitud.model'
import PagoReferencia from '../models/PagoReferencia.model'

export const solicitarAcceso = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, folio } = req.body

        // Revisar si ya existe una solicitud con ese email
        let solicitud = await Solicitud.findOne({ where: { email } })
        if (solicitud) {
            // Actualizar el folio y poner en 'Procesando' de nuevo
            solicitud.folio = folio
            solicitud.estatus = 'Procesando'
            await solicitud.save()
        } else {
            solicitud = await Solicitud.create({ email, folio })
        }

        // Llamar al Webhook de n8n
        const webhookUrl = process.env.N8N_WEBHOOK_URL
        if (webhookUrl) {
            try {
                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, folio })
                })
            } catch (webhookError) {
                console.error("Error al disparar el webhook de n8n", webhookError)
            }
        }

        res.status(201).json({ message: 'Solicitud en proceso', data: solicitud })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Hubo un error al procesar la solicitud' })
    }
}

export const verificarEstatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.params
        const solicitud = await Solicitud.findOne({ where: { email } })
        
        if (!solicitud) {
            res.status(404).json({ error: 'Solicitud no encontrada' })
            return
        }

        res.json({ estatus: solicitud.estatus })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Hubo un error al consultar el estatus' })
    }
}

export const actualizarEstatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, estatus } = req.body

        const solicitud = await Solicitud.findOne({ where: { email } })
        if (!solicitud) {
            res.status(404).json({ error: 'Solicitud no encontrada' })
            return
        }

        solicitud.estatus = estatus
        await solicitud.save()

        res.json({ message: 'Estatus actualizado', data: solicitud })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Hubo un error al actualizar el estatus' })
    }
}
