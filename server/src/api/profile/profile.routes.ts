import express from 'express'
import asyncHandler from '../../middleware/asyncHandler.js'
import { profileSchema } from '../../middleware/validations/profileSchema.js'
import validationHandler from '../../middleware/validations/validationHandler.js'
import { createProfile } from './profile.controller.js'

const router = express.Router()

router.post(
  '/newProfile',
  profileSchema,
  validationHandler,
  asyncHandler(createProfile)
)
