import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError.js'
import { getIdentifierFromALS } from '../../service/als.service.js'
import { accountService } from '../account/account.service.js'
import { companyService } from '../company/company.service.js'
import { employeeService } from './employee.service.js'

// TODO
// {
//     "success": true,
//     "message": "User logged in successfully",
//     "data": { }
// }
export async function getBasicEmployeeData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const identifier = getIdentifierFromALS()

  const accountDoc = await accountService.getAccountDoc(identifier)
  if (!accountDoc) throw new BadRequestError('Cannot find account')

  const employeeId = accountDoc.employee
  if (!employeeId) throw new BadRequestError('Cannot find employee')

  const companyId = await employeeService.getCompanyId(employeeId)
  if (!companyId) throw new BadRequestError('Cannot find company')

  const company = await companyService.getCompanyDoc(companyId)
  if (!company) throw new BadRequestError('Cannot find company')

  const companyEmployeeIds = company.employees

  const basicEmployeeData =
    employeeService.getBasicEmployeeData(companyEmployeeIds)

  res.status(200).json({
    success: true,
    message: 'Successfully retrieved basic employee data',
    data: {
      employee: basicEmployeeData,
    },
  })
}
