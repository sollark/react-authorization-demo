import express from 'express'
import asyncHandler from '../../middleware/asyncHandler.js'
import requireAuth from '../../middleware/requireAuth.js'
import {
  getBasicCompanyData,
  getCompany,
  getCompanyEmployees,
  updateEmployee,
} from './company.controller.js'

const router = express.Router()
router.post('/updateEmployee', requireAuth, asyncHandler(updateEmployee))
router.get('/', requireAuth, asyncHandler(getCompany))
router.get('/employees', requireAuth, asyncHandler(getCompanyEmployees))
router.get('/basic', requireAuth, asyncHandler(getBasicCompanyData))

export { router as companyRoutes }
