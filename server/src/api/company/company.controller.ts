import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError.js'
import { getIdentifierFromALS } from '../../service/als.service.js'
import { departmentService } from '../../service/department.service.js'
import { accountService } from '../account/account.service.js'
import { profileService } from '../profile/profile.service.js'

// TODO res structure
// {
//     "success": true,
//     "message": "User logged in successfully",
//     "data": { }
// }

// Workplace will be changed to Employee
// type Employee = {
//   firstName: string // Profile
//   lastName: string // Profile
//   ID: string // Profile
//   companyName: string // Workplace
//   departmentName: string // Workplace
//   employeeId: string // Workplace
//   position: string // Workplace
//   role: Role // Account
//   status: Status // Account
// }

export async function getCompanyEmployees(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const identifier = getIdentifierFromALS()
  const account = await accountService.getAccount(identifier)
  if (!account) {
    throw new BadRequestError('Cannot find account')
  }

  const employees = account.employee?.company?.employees
  if (!employees) {
    throw new BadRequestError('Cannot find employees')
  }

  res.status(200).json({
    success: true,
    message: 'Company employees are ready to view.',
    data: { employees },
  })
}

export async function addEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // TODO check permissions
  const identifier = getIdentifierFromALS()

  const data = req.body

  // destruct employee table rows
  const { firstName, lastName, ID, departmentName, position, role, status } =
    data

  // create profile
  const profile = await profileService.createProfile({
    firstName,
    lastName,
    ID,
  })

  // TODO find any department, should find company department
  const department = departmentService.getDepartmentDBId(departmentName)

  // create employee
  // const companyDBId = employeeService.getCompanyDBId()

  res.status(200).json({
    success: true,
    message: 'A new employee has been added to the company.',
    data: {},
  })
}