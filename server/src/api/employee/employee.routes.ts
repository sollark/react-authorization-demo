import express from 'express'
import asyncHandler from '../../middleware/asyncHandler.js'
import requireAuth from '../../middleware/requireAuth.js'
import { getAllEmployees } from './employee.controller.js'

const router = express.Router()

router.get('/all', requireAuth, asyncHandler(getAllEmployees))

export { router as employeeRoutes }
