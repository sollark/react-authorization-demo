import express from 'express'
import requireAuth from '../../middleware/requireAuth.js'
import { accountSchema } from '../../middleware/validations/accountSchema.js'
import validateRequest from '../../middleware/validations/validationHandler.js'
import asyncHandler from '../../middleware/asyncHandler.js'
import { addAccount, getAccount } from './account.controller.js'

const router = express.Router()

router.post(
  '/add',
  requireAuth,
  accountSchema,
  validateRequest,
  asyncHandler(addAccount)
)

// TODO middlewares, regex
router.get('/get', requireAuth, asyncHandler(getAccount))
router.get('/get/:id([0-9a-z]{24})', requireAuth, asyncHandler(getAccount))

export { router as accountRoutes }
