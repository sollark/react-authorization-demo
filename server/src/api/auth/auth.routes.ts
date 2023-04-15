import express from 'express'
import asyncHandler from '../../utils/asyncHandler.js'
import validateRequest from '../../middleware/validationHandler.js'
import {
  getAccounts,
  refresh,
  registration,
  signIn,
  signOut,
} from './auth.controller.js'
import { registrationSchema } from '../../validations/registration.schema.js'
import { signInSchema } from '../../validations/signIn.schema.js'
import authHandler from '../../middleware/authHandler.js'

const router = express.Router()

router.post(
  '/register',
  registrationSchema,
  validateRequest,
  asyncHandler(registration)
)
router.post('/signin', signInSchema, validateRequest, asyncHandler(signIn))
router.put('/signout', asyncHandler(signOut))
router.get('/refresh', asyncHandler(refresh))
router.get('/account', authHandler, asyncHandler(getAccounts))

export { router as authRoutes }
