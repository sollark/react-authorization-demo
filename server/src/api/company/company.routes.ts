import express from 'express'
import asyncHandler from '../../middleware/asyncHandler.js'
import requireAuth from '../../middleware/requireAuth.js'
import {
  addEmployee,
  getCompany,
  getCompanyEmployees,
} from './company.controller.js'

const router = express.Router()
router.post('/addEmployee', requireAuth, asyncHandler(addEmployee))
router.get('/', requireAuth, asyncHandler(getCompany))
router.get('/employees', requireAuth, asyncHandler(getCompanyEmployees))

export { router as companyRoutes }
