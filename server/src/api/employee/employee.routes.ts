import express from 'express'
import asyncHandler from '../../middleware/asyncHandler.js'
import requireAuth from '../../middleware/requireAuth.js'
import { getBasicEmployeeData } from './employee.controller.js'

const router = express.Router()

router.get('/basic', requireAuth, asyncHandler(getBasicEmployeeData))

export { router as employeeRoutes }
