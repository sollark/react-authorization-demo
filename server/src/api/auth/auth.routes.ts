import express from 'express'
import asyncHandler from '../../utils/asyncHandler.js'
import validateRequest from '../../middleware/validationHandler.js'
import { refresh, registration, signIn, signOut } from './auth.controller.js'
import { registrationSchema } from '../../validations/registration.schema.js'
import { signInSchema } from '../../validations/signIn.schema.js'
import { tokenSchema } from '../../validations/token.schema.js'

const router = express.Router()

router.post(
  '/register',
  registrationSchema,
  validateRequest,
  asyncHandler(registration)
)
router.post('/signin', signInSchema, validateRequest, asyncHandler(signIn))
router.put('/signout', tokenSchema, asyncHandler(signOut))
router.get('/refresh', tokenSchema, asyncHandler(refresh))

export { router as authRoutes }
