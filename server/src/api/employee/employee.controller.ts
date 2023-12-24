import { NextFunction, Request, Response } from 'express'
import { companyNumberService } from '../../service/companyNumber.service.js'
import { employeeService } from './employee.service.js'

export async function getAllEmployees(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const employees = await employeeService.getAllEmployees()
  if (!employees) {
    return res.status(400).json({
      success: false,
      message: 'Cannot find employees',
    })
  }

  res.status(200).json({
    success: true,
    message: 'Successfully retrieved all employees',
    data: {
      employees,
    },
  })
}

export async function getEmployeeNumber(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const employeeNumber = companyNumberService.generateCompanyNumber()

  res.status(200).json({
    success: true,
    message: 'Successfully retrieved employeeNumber',
    data: { employeeNumber },
  })
}
