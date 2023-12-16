import express from 'express'
import asyncHandler from '../../middleware/asyncHandler.js'
import requireAuth from '../../middleware/requireAuth.js'
import {
  deleteEmployee,
  getBasicCompanyData,
  getCompany,
  getCompanyEmployees,
  getCompanyEmployeesAccounts,
  updateEmployee,
} from './company.controller.js'

// TODO update employee account
const router = express.Router()
router.get('/:companyNumber', requireAuth, asyncHandler(getCompany))
router.get(
  '/:companyNumber/basic',
  requireAuth,
  asyncHandler(getBasicCompanyData)
)
router.get(
  '/:companyNumber/employees',
  requireAuth,
  asyncHandler(getCompanyEmployees)
)
router.put(
  '/:companyNumber/employees/:employeeNumber',
  requireAuth,
  asyncHandler(updateEmployee)
)
router.delete(
  '/:companyNumber/employees/:employeeNumber',
  requireAuth,
  asyncHandler(deleteEmployee)
)
router.get(
  '/:companyNumber/accounts',
  requireAuth,
  asyncHandler(getCompanyEmployeesAccounts)
)

export { router as companyRoutes }
