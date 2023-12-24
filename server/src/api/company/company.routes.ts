import express from 'express'
import asyncHandler from '../../middleware/asyncHandler.js'
import requireAuth from '../../middleware/requireAuth.js'
import {
  deleteEmployee,
  generateEmployeeNumber,
  getBasicCompanyData,
  getCompany,
  getCompanyEmployeeAdvancedTableData,
  getCompanyEmployeeBasicTableData,
  getCompanyEmployees,
  getCompanyEmployeesAccounts,
  updateCompanyEmployeeAccount,
  updateEmployee,
} from './company.controller.js'

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
router.get(
  '/:companyNumber/employees/basicTableData',
  requireAuth,
  asyncHandler(getCompanyEmployeeBasicTableData)
)
router.get(
  '/:companyNumber/employees/advancedTableData',
  requireAuth,
  asyncHandler(getCompanyEmployeeAdvancedTableData)
)

router.get(
  '/:companyNumber/employees/employeeNumber',
  requireAuth,
  asyncHandler(generateEmployeeNumber)
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
