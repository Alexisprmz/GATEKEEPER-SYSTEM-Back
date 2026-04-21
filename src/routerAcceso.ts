import { Router } from 'express'
import { body, param } from 'express-validator'
import { handlerInputErrors } from './middleware'
import { solicitarAcceso, verificarEstatus, actualizarEstatus } from './handlers/acceso'

const routerAcceso = Router()

routerAcceso.post(
  '/solicitar-acceso',
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('folio').notEmpty().withMessage('El folio no puede ir vacío'),
  handlerInputErrors,
  solicitarAcceso
)

routerAcceso.get(
  '/verificar-estatus/:email',
  param('email').isEmail().withMessage('Debe ser un email válido'),
  handlerInputErrors,
  verificarEstatus
)

routerAcceso.patch(
  '/solicitudes/:email/estatus',
  param('email').isEmail().withMessage('Debe ser un email válido'),
  body('estatus').notEmpty().withMessage('El estatus no puede ir vacío'),
  handlerInputErrors,
  actualizarEstatus
)

export default routerAcceso