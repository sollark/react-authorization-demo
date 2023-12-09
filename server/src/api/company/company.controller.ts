import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError.js'
import { getIdentifierFromALS } from '../../service/als.service.js'
import { departmentService } from '../../service/department.service.js'
import logger from '../../service/logger.service.js'
import { accountService } from '../account/account.service.js'
import { employeeService } from '../employee/employee.service.js'
import { profileService } from '../profile/profile.service.js'
import { companyService } from './company.service.js'

// TODO res structure
// {
//     "success": true,
//     "message": "User logged in successfully",
//     "data": { }
// }

export async function getCompany(
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

  const company = await companyService.getCompany(companyId)
  if (!company) throw new BadRequestError('Cannot find company')

  res.status(200).json({
    success: true,
    message: 'Company is ready to view.',
    data: { company },
  })
}

export async function getBasicCompanyData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info(`companyController- getBasicCompanyData`)

  const identifier = getIdentifierFromALS()
  const accountDoc = await accountService.getAccountDoc(identifier)
  if (!accountDoc) throw new BadRequestError('Cannot find account')

  const employeeId = accountDoc.employee
  if (!employeeId) throw new BadRequestError('Cannot find employee')

  const companyId = await employeeService.getCompanyId(employeeId)
  if (!companyId) throw new BadRequestError('Cannot find company')

  const company = await companyService.getCompany(companyId)
  if (!company) throw new BadRequestError('Cannot find company')

  // filter company data, only return basic data
  const { companyName, companyNumber, departments, employees } = company
  const basicDepartmentsData = departments.map((department) => {
    const { departmentName } = department
    return { departmentName }
  })

  const basicEmployeesData = employees.map((employee) => {
    const { department, employeeNumber, position, profile } = employee
    const { firstName, lastName } = profile

    return {
      profile: { firstName, lastName },
      department,
      employeeNumber,
      position,
    }
  })

  const basicCompanyData = {
    companyName,
    companyNumber,
    departments: basicDepartmentsData,
    employees: basicEmployeesData,
  }

  res.status(200).json({
    success: true,
    message: 'Company is ready to view.',
    data: { basicCompanyData },
  })
}

export async function getCompanyEmployees(
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

  const employees = await companyService.getCompanyEmployees(companyId)
  if (!employees) throw new BadRequestError('Cannot find employees')

  res.status(200).json({
    success: true,
    message: 'Company employees are ready to view.',
    data: { employees },
  })
}

// TODO is in use?
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

export async function updateEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // TODO check permissions
  const identifier = getIdentifierFromALS()

  const data = req.body

  // destruct employee table rows
  const {
    companyNumber,
    firstName,
    lastName,
    ID,
    departmentName,
    employeeNumber,
    position,
  } = data

  // check if an employee exists
  const employeeDoc = await employeeService.getEmployeeDoc(
    companyNumber,
    employeeNumber
  )

  if (!employeeDoc) {
    const companyDoc = await companyService.getCompanyDocByNumber(companyNumber)
    if (!companyDoc) throw new BadRequestError('Cannot find company')

    const profile = await profileService.createProfile({
      firstName,
      lastName,
      ID,
    })

    const departmentDoc = await companyService.getCompanyDepartmentDocByName(
      companyDoc._id,
      departmentName
    )
    if (!departmentDoc) throw new BadRequestError('Cannot find department')

    const employee = await employeeService.createEmployee(
      profile._id,
      companyDoc._id,
      departmentDoc._id,
      position
    )
    if (!employee) throw new BadRequestError('Cannot create employee')

    await companyService.addEmployee(companyDoc._id, employee._id)
    await departmentService.addEmployee(departmentDoc._id, employee._id)
  }

  if (employeeDoc) {
    const [
      updatedProfileData,
      updateEmployeeData,
      updatedCompanyData,
      updatedDepartmentData,
    ] = accountService.sortAccountData(data)

    const updatedProfile = await profileService.updateProfile(
      employeeDoc.profile,
      updatedProfileData
    )

    const updatedEmployee = await employeeService.updateEmployee(
      employeeDoc._id,
      updateEmployeeData
    )

    const departmentDoc = await companyService.getCompanyDepartmentDocByName(
      employeeDoc.company,
      departmentName
    )
    if (!departmentDoc) throw new BadRequestError('Cannot find department')

    await employeeService.changeDepartment(employeeDoc._id, departmentDoc._id)
  }

  res.status(200).json({
    success: true,
    message: 'An employee has been updated.',
    data: {},
  })
}

export async function deleteEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // TODO check permissions
  const identifier = getIdentifierFromALS()

  const data = req.body
  const { companyNumber, employeeNumber } = data

  const employeeDoc = await employeeService.getEmployeeDoc(
    companyNumber,
    employeeNumber
  )
  if (!employeeDoc) throw new BadRequestError('Cannot find employee')

  const accountDoc = await accountService.getEmployeeAccountDoc(employeeDoc._id)
  if (accountDoc) await accountService.disconnectEmployee(accountDoc._id)
  if (!accountDoc) await profileService.deleteProfile(employeeDoc.profile)

  await employeeService.deleteEmployee(employeeDoc._id)

  res.status(200).json({
    success: true,
    message: 'An employee has been deleted.',
    data: {},
  })
}

// console.log(
//   `companyController- getBasicCompanyData, company: ${JSON.stringify(
//     company,
//     null,
//     2 // Indentation level, adjust as needed
//   )}`
// )
