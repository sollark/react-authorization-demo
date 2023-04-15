import express from 'express'
import requireAuth from '../../middleware/requireAuth.js'
import validateRequest from '../../middleware/validationHandler.js'
import asyncHandler from '../../utils/asyncHandler.js'
import { registrationSchema } from '../../validations/registration.schema.js'
import { signInSchema } from '../../validations/signIn.schema.js'
import {
  getAccounts,
  refresh,
  registration,
  signIn,
  signOut,
} from './auth.controller.js'

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
router.get('/account', requireAuth, asyncHandler(getAccounts))

export { router as authRoutes }
