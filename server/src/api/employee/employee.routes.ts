import express from 'express'
import asyncHandler from '../../middleware/asyncHandler.js'
import requireAuth from '../../middleware/requireAuth.js'
import { getAllEmployees } from './employee.controller.js'
// import { getBasicEmployeeData } from './employee.controller.js'

const router = express.Router()

// TODO is in use?
// router.get('/basic', requireAuth, asyncHandler(getBasicEmployeeData))
router.get('/all', requireAuth, asyncHandler(getAllEmployees))

export { router as employeeRoutes }
