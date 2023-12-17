import { NextFunction, Request, Response } from 'express'
import { employeeService } from './employee.service.js'

// TODO
// {
//     "success": true,
//     "message": "User logged in successfully",
//     "data": { }
// }

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

// TODO is in use?

// export async function getBasicEmployeeData(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const identifier = getIdentifierFromALS()

//   const accountDoc = await accountService.getAccountDoc(identifier)
//   if (!accountDoc) throw new BadRequestError('Cannot find account')

//   const employeeId = accountDoc.employee
//   if (!employeeId) throw new BadRequestError('Cannot find employee')

//   const companyId = await employeeService.getCompanyId(employeeId)
//   if (!companyId) throw new BadRequestError('Cannot find company')

//   const company = await companyService.getCompanyDoc(companyId)
//   if (!company) throw new BadRequestError('Cannot find company')

//   const companyEmployeeIds = company.employees

//   const basicEmployeeData =
//     employeeService.getBasicEmployeeData(companyEmployeeIds)

//   res.status(200).json({
//     success: true,
//     message: 'Successfully retrieved basic employee data',
//     data: {
//       employee: basicEmployeeData,
//     },
//   })
// }
