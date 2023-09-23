import express from 'express'
import asyncHandler from '../../middleware/asyncHandler.js'
import { getAllEmployees } from './workspace.controller.js'

const router = express.Router()

router.get('/getAllEmployees', asyncHandler(getAllEmployees))

export { router as workplaceRoutes }
