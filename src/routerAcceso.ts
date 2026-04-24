import { Router } from 'express'
import { body, param } from 'express-validator'
import { handlerInputErrors } from './middleware'
import { solicitarAcceso, verificarEstatus, actualizarEstatus } from './handlers/acceso'

const routerAcceso = Router()

routerAcceso.post(
  '/solicitar-acceso',
  body('email').isEmail().withMessage('Debe ser un email valido'),
  body('folio').notEmpty().withMessage('El folio no puede ir vacio'),
  handlerInputErrors,
  solicitarAcceso
)

routerAcceso.get(
  '/verificar-estatus/:email',
  param('email').isEmail().withMessage('Debe ser un email valido'),
  handlerInputErrors,
  verificarEstatus
)

routerAcceso.patch(
  '/solicitudes/estatus',
  body('email').isEmail().withMessage('Debe ser un email valido'),
  body('estatus').notEmpty().withMessage('El estatus no puede ir vacio'),
  handlerInputErrors,
  actualizarEstatus
)

export default routerAcceso