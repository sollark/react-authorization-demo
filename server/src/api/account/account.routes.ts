import express from 'express'
import asyncHandler from '../../middleware/asyncHandler.js'
import requireAuth from '../../middleware/requireAuth.js'
import { accountSchema } from '../../middleware/validations/accountSchema.js'
import validateRequest from '../../middleware/validations/validationHandler.js'
import { updateAccount } from './account.controller.js'

const router = express.Router()

router.post(
  '/update',
  requireAuth,
  accountSchema,
  validateRequest,
  asyncHandler(updateAccount)
)

// TODO middlewares, regex
// router.get('/get', requireAuth, asyncHandler(getAccount))
// router.get('/get/:id([0-9a-z]{24})', requireAuth, asyncHandler(getAccount))

export { router as accountRoutes }
