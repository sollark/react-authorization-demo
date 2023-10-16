import { NextFunction, Request, Response } from 'express'
import { getIdentifierFromALS } from '../../service/als.service.js'
import { departmentService } from '../../service/department.service.js'
import { profileService } from '../profile/profile.service.js'

// TODO res structure
// {
//     "success": true,
//     "message": "User logged in successfully",
//     "data": { }
// }

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
