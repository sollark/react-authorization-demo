import express from 'express'
import requireAuth from '../../middleware/requireAuth.js'
import { registrationSchema } from '../../middleware/validations/registration.schema.js'
import { signInSchema } from '../../middleware/validations/signIn.schema.js'
import validateRequest from '../../middleware/validations/validationHandler.js'
import verifyRoles from '../../middleware/verifyRoles.js'
import asyncHandler from '../../utils/asyncHandler.js'
import { USER_ROLE, UserRole } from '../../mongodb/models/roleCode.model.js'
import {
  getAccounts,
  refresh,
  registration,
  signIn,
  signOut,
} from './auth.controller.js'

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
  verifyRoles(USER_ROLE.Admin as UserRole),
  asyncHandler(getAccounts)
)

export { router as authRoutes }
