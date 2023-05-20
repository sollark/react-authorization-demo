import express from 'express'
import requireAuth from '../../middleware/requireAuth.js'
import { accountSchema } from '../../middleware/validations/accountSchema.js'
import validateRequest from '../../middleware/validations/validationHandler.js'
import asyncHandler from '../../utils/asyncHandler.js'
import { addAccount } from './account.controller.js'

const router = express.Router()

router.post(
  '/add',
  requireAuth,
  accountSchema,
  validateRequest,
  asyncHandler(addAccount)
)

router.get('/get', asyncHandler(addAccount))
// router.get('/get', requireAuth, asyncHandler(getUser))

export { router as accountRoutes }
