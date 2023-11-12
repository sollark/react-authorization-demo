import express from 'express'
import asyncHandler from '../../middleware/asyncHandler.js'
import requireAuth from '../../middleware/requireAuth.js'
import { getBasicEmployeeData } from './employee.controller.js'

const router = express.Router()

router.get('/basic', requireAuth, asyncHandler(getBasicEmployeeData))

// router.get('/advanced', requireAuth, asyncHandler(getAdvancedEmployeeData))

export { router as employeeRoutes }
