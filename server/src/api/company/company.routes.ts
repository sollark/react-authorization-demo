import express from 'express'
import asyncHandler from '../../middleware/asyncHandler.js'
import requireAuth from '../../middleware/requireAuth.js'
import {
  deleteEmployee,
  getBasicCompanyData,
  getCompany,
  getCompanyEmployees,
  getCompanyEmployeesAccounts,
  updateCompanyEmployeeAccount,
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
router.put(
  '/:companyNumber/accounts/:employeeNumber',
  requireAuth,
  asyncHandler(updateCompanyEmployeeAccount)
)

export { router as companyRoutes }
