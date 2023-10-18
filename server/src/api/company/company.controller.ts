import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError.js'
import { Status } from '../../mongodb/models/account.model.js'
import { Role } from '../../mongodb/models/role.model.js'
import { getIdentifierFromALS } from '../../service/als.service.js'
import { departmentService } from '../../service/department.service.js'
import { accountService } from '../account/account.service.js'
import { profileService } from '../profile/profile.service.js'
import { workplaceService } from '../workspace/workspace.service.js'
import { companyService } from './company.service.js'

// TODO res structure
// {
//     "success": true,
//     "message": "User logged in successfully",
//     "data": { }
// }

type Employee = {
  firstName: string
  lastName: string
  ID: string
  companyName: string
  departmentName: string
  position: string
  role: Role
  status: Status
}

export async function getCompanyEmployees(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const identifier = getIdentifierFromALS()
  const accountRef = await accountService.getAccountRef(identifier)
  if (!accountRef.workplace) {
    throw new BadRequestError('Cannot find workplace')
  }

  const workplaceRef = await workplaceService.getWorkplaceRefById(
    accountRef.workplace
  )
  if (!workplaceRef?.company) {
    throw new BadRequestError('Cannot find company')
  }

  const companyDBId = workplaceRef.company
  const employees = await companyService.getCompanyEmployees(companyDBId)
  if (!employees) {
    throw new BadRequestError('Cannot find employees')
  }

  // TODO response should be employee type

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

  // create workplace
  // const companyDBId = workplaceService.getCompanyDBId()

  res.status(200).json({
    success: true,
    message: 'A new employee has been added to the company.',
    data: {},
  })
}
