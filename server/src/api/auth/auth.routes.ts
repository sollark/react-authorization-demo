import express from 'express'
import requireAuth from '../../middleware/requireAuth.js'
import validateRequest from '../../middleware/validationHandler.js'
import verifyRoles from '../../middleware/verifyRoles.js'
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
import { USER_ROLE } from '../../config/userRoles.js'

const router = express.Router()

router.post(
  '/registration',
  registrationSchema,
  validateRequest,
  asyncHandler(registration)
)
router.post('/signin', signInSchema, validateRequest, asyncHandler(signIn))
router.put('/signout', requireAuth, asyncHandler(signOut))
router.get('/refresh', asyncHandler(refresh))
router.get(
  '/account',
  requireAuth,
  verifyRoles(USER_ROLE.Admin),
  asyncHandler(getAccounts)
)

export { router as authRoutes }
