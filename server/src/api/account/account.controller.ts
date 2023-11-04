import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError.js'
import { Account } from '../../mongodb/models/account.model.js'
import { Company } from '../../mongodb/models/company.model.js'
import { Department } from '../../mongodb/models/department.model.js'
import { Employee } from '../../mongodb/models/employee.model.js'
import { USER_ROLE } from '../../mongodb/models/role.model.js'
import { getIdentifierFromALS } from '../../service/als.service.js'
import { departmentService } from '../../service/department.service.js'
import { profileService } from '../../service/profile.service.js'
import { companyService } from '../company/company.service.js'
import { employeeService } from '../employee/employee.service.js'
import { accountService } from './account.service.js'

// TODO
// {
//     "success": true,
//     "message": "User logged in successfully",
//     "data": { }
// }

export async function updateAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const identifier = getIdentifierFromALS()
  const accountData: Account = req.body

  console.log('updateAccount, account: ', accountData)

  const [
    updatedProfileData,
    updateEmployeeData,
    updatedCompanyData,
    updatedDepartmentData,
  ] = accountService.sortAccountData(accountData)

  console.log('updateAccount, updatedProfileData: ', updatedProfileData)
  console.log('updateAccount, updateEmployeeData: ', updateEmployeeData)
  console.log('updateAccount, updatedCompanyData: ', updatedCompanyData)
  console.log('updateAccount, updatedDepartmentData: ', updatedDepartmentData)

  const accountRef = await accountService.getAccountRef(identifier)
  if (!accountRef) throw new BadRequestError('Cannot find account')

  const updatedProfile = await profileService.updateProfile(
    accountRef.profile,
    updatedProfileData
  )
  if (!updatedProfile) {
    throw new BadRequestError('Cannot update profile')
  }

  const { companyName, companyNumber } = updatedCompanyData as Partial<Company>
  const { departmentName } = updatedDepartmentData as Partial<Department>
  const { employeeNumber } = updateEmployeeData as Partial<Employee>

  let employee: any = null
  // In this case we have employee already created, it contains profile and company and etc.
  if (companyNumber && employeeNumber) {
    const companyDoc = await companyService.getCompanyDocByNumber(companyNumber)
    if (!companyDoc) throw new BadRequestError('Cannot find company')

    const employeeDoc = await companyService.getCompanyEmployeeDocByNumber(
      companyDoc._id,
      employeeNumber
    )
    if (!employeeDoc) throw new BadRequestError('Cannot find employee')

    await accountService.setEmployee(accountRef._id, employeeDoc._id)

    // when joining existing company, set role to user
    await accountService.setRole(identifier, USER_ROLE.user)
  }

  if (companyName && departmentName) {
    let company = await companyService.createCompany(companyName)
    if (!company) throw new BadRequestError('Cannot create company')
    let department = await departmentService.createDepartment(
      company._id,
      departmentName
    )
    if (!department) throw new BadRequestError('Cannot create department')

    company = await companyService.addDepartment(company._id, department._id)
    if (!company) throw new BadRequestError('Cannot add department to company')

    const employee = await employeeService.createEmployee(
      updatedProfile._id,
      company._id,
      department._id
    )
    if (!employee) throw new BadRequestError('Cannot create employee')
    company = await companyService.addEmployee(company._id, employee._id)
    if (!company) throw new BadRequestError('Cannot add an employee to company')

    department = await departmentService.addEmployee(
      department._id,
      employee._id
    )
    console.log('1')

    await accountService.setEmployee(accountRef._id, employee._id)
    console.log('2')

    // when joining new company, set role to manager
    await accountService.setRole(identifier, USER_ROLE.manager)
    console.log('3')
  }

  const completedAccount = await accountService.completeAccount(accountRef._id)

  res.status(200).json({ account: completedAccount })
}

export async function joinCompany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const identifier = getIdentifierFromALS()
  const { companyId, employeeId } = req.body

  const employee = await employeeService.joinExistingCompany(
    identifier,
    companyId,
    employeeId
  )

  const account = await accountService.getAccount(identifier)
  res.status(200).json({ account })
}

export async function getAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const identifier = getIdentifierFromALS()
  const account = await accountService.getAccount(identifier)

  res.status(200).json({ account })
}
