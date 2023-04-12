import express from 'express'
import asyncHandler from '../../utils/asyncHandler.js'
import validateRequest from '../../middleware/validationHandler.js'
import { registrationSchema } from '../../validations/registration.schema.js'
import { refresh, registration, signin, signout } from './auth.controller.js'

const router = express.Router()

router.post(
  '/register',
  registrationSchema,
  validateRequest,
  asyncHandler(registration)
)
router.post('/signin', signin)
router.get('/refresh', refresh)
router.put('/signout', signout)

export { router as authRoutes }
