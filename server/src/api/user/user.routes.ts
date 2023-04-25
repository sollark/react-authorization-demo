import express from 'express'
import requireAuth from '../../middleware/requireAuth.js'
import validateRequest from '../../middleware/validationHandler.js'
import asyncHandler from '../../utils/asyncHandler.js'
import { newUserSchema } from '../../validations/newUser.schema.js'
import { addUser, getUser } from './user.controller.js'

const router = express.Router()

router.post(
  '/add',
  requireAuth,
  newUserSchema,
  validateRequest,
  asyncHandler(addUser)
)

router.get('/get', asyncHandler(getUser))
// router.get('/get', requireAuth, asyncHandler(getUser))
