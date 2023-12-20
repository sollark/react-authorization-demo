import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError.js'
import { getIdentifierFromALS } from '../../service/als.service.js'
import { companyNumberService } from '../../service/companyNumber.service.js'
import { departmentService } from '../../service/department.service.js'
import { employeeNumberService } from '../../service/employeeNumber.service.js'
import { accountService } from '../account/account.service.js'
import { employeeService } from '../employee/employee.service.js'
import { profileService } from '../profile/profile.service.js'
import { companyService } from './company.service.js'

export async function getCompany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const identifier = getIdentifierFromALS()

  const companyNumber = req.params.companyNumber
  const isValid = companyNumberService.isValidCompanyNumber(companyNumber)
  if (!isValid) throw new BadRequestError('Invalid company number')

  const company = await companyService.getCompanyByNumber(companyNumber)
  if (!company) {
    res.status(404).json({
      success: false,
      message: 'Company not found',
      data: {},
    })
    return
  }

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
  const identifier = getIdentifierFromALS()

  const companyNumber = req.params.companyNumber
  const isValid = companyNumberService.isValidCompanyNumber(companyNumber)
  if (!isValid) throw new BadRequestError('Invalid company number')

  const company = await companyService.getCompanyByNumber(companyNumber)
  if (!company) {
    res.status(404).json({
      success: false,
      message: 'Company not found',
      data: {},
    })
    return
  }

  // filter company data, only return basic data
  const { companyName, departments, employees } = company
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

  const companyNumber = req.params.companyNumber
  const isValid = companyNumberService.isValidCompanyNumber(companyNumber)
  if (!isValid) throw new BadRequestError('Invalid company number')

  const company = await companyService.getCompanyByNumber(companyNumber)
  if (!company) {
    res.status(404).json({
      success: false,
      message: 'Company not found',
      data: {},
    })
    return
  }

  const employees = await companyService.getCompanyEmployees(company._id)
  if (!employees) {
    res.status(404).json({
      success: false,
      message: 'Employees not found',
      data: {},
    })
    return
  }

  res.status(200).json({
    success: true,
    message: 'Company employees are ready to view.',
    data: { employees },
  })
}

export async function getCompanyEmployeeBasicTableData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const identifier = getIdentifierFromALS()

  const companyNumber = req.params.companyNumber
  const isValid = companyNumberService.isValidCompanyNumber(companyNumber)
  if (!isValid) throw new BadRequestError('Invalid company number')

  const company = await companyService.getCompanyDocByNumber(companyNumber)
  if (!company) {
    res.status(404).json({
      success: false,
      message: 'Company not found',
      data: {},
    })
    return
  }

  const companyEmployeeIds = company.employees
  const basicEmployeeData =
    employeeService.getBasicEmployeeTableData(companyEmployeeIds)

  res.status(200).json({
    success: true,
    message: 'Successfully retrieved basic employee data',
    data: {
      employee: basicEmployeeData,
    },
  })
}

export async function getCompanyEmployeeAdvancedTableData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const identifier = getIdentifierFromALS()

  const companyNumber = req.params.companyNumber
  const isValid = companyNumberService.isValidCompanyNumber(companyNumber)
  if (!isValid) throw new BadRequestError('Invalid company number')

  const company = await companyService.getCompanyDocByNumber(companyNumber)
  if (!company) {
    res.status(404).json({
      success: false,
      message: 'Company not found',
      data: {},
    })
    return
  }

  const companyEmployeeIds = company.employees
  const advancedEmployeeData =
    employeeService.getAdvancedEmployeeTableData(companyEmployeeIds)

  res.status(200).json({
    success: true,
    message: 'Successfully retrieved advanced employee data',
    data: {
      employee: advancedEmployeeData,
    },
  })
}

export async function getCompanyEmployeesAccounts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const identifier = getIdentifierFromALS()

  const companyNumber = req.params.companyNumber
  const isValid = companyNumberService.isValidCompanyNumber(companyNumber)
  if (!isValid) throw new BadRequestError('Invalid company number')

  const company = await companyService.getCompanyByNumber(companyNumber)
  if (!company) {
    res.status(404).json({
      success: false,
      message: 'Company not found',
      data: {},
    })
    return
  }

  const employeeIds = await companyService.getCompanyEmployeeIds(company._id)
  if (!employeeIds) {
    res.status(404).json({
      success: false,
      message: 'Employees not found',
    })
    return
  }

  const accounts = await accountService.getAccounts(employeeIds)
  if (!accounts) {
    res.status(404).json({
      success: false,
      message: 'Employees not found',
    })
    return
  }

  res.status(200).json({
    success: true,
    message: 'Company employees accounts are ready to view.',
    data: { accounts },
  })
}

export async function updateCompanyEmployeeAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const identifier = getIdentifierFromALS()

  const companyNumber = req.params.companyNumber
  const isValid = companyNumberService.isValidCompanyNumber(companyNumber)
  if (!isValid) throw new BadRequestError('Invalid company number')

  const employeeNumber = req.params.employeeNumber
  const isValidEmployeeNumber =
    employeeNumberService.isValidEmployeeNumber(employeeNumber)
  if (!isValidEmployeeNumber)
    throw new BadRequestError('Invalid employee number')

  const company = await companyService.getCompanyByNumber(companyNumber)
  if (!company) {
    res.status(404).json({
      success: false,
      message: 'Company not found',
      data: {},
    })
    return
  }

  const employeeDoc = await employeeService.getEmployeeDoc(
    companyNumber,
    employeeNumber
  )
  if (!employeeDoc) {
    res.status(404).json({
      success: false,
      message: 'Employee not found',
      data: {},
    })
    return
  }

  const accountDoc = await accountService.getEmployeeAccountDoc(employeeDoc._id)
  if (!accountDoc) {
    res.status(404).json({
      success: false,
      message: 'Account not found',
      data: {},
    })
    return
  }

  const data = req.body
  const { role, status } = data

  const updatedAccount = await accountService.updateAccount(
    accountDoc._id,
    role,
    status
  )
  if (!updatedAccount) throw new BadRequestError('Account not updated')

  res.status(200).json({
    success: true,
    message: 'Account has been updated.',
    data: { updatedAccount },
  })
}

export async function addEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const identifier = getIdentifierFromALS()

  const companyNumber = req.params.companyNumber
  const isValid = companyNumberService.isValidCompanyNumber(companyNumber)
  if (!isValid) throw new BadRequestError('Invalid company number')

  const company = await companyService.getCompanyByNumber(companyNumber)
  if (!company) {
    res.status(404).json({
      success: false,
      message: 'Company not found',
      data: {},
    })
    return
  }

  const data = req.body
  const { firstName, lastName, ID, departmentName, position, role } = data

  // create profile
  const profile = await profileService.createProfile({
    firstName,
    lastName,
    ID,
  })

  const departmentDoc = await companyService.getCompanyDepartmentDocByName(
    company._id,
    departmentName
  )
  if (!departmentDoc) {
    res.status(404).json({
      success: false,
      message: 'Department not found',
      data: {},
    })
    return
  }

  // create employee
  const employee = await employeeService.createEmployee(
    profile._id,
    company._id,
    departmentDoc._id,
    position
  )
  if (!employee) {
    res.status(404).json({
      success: false,
      message: 'Employee not created',
      data: {},
    })
    return
  }

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
  const identifier = getIdentifierFromALS()

  const companyNumber = req.params.companyNumber
  const isValid = companyNumberService.isValidCompanyNumber(companyNumber)
  if (!isValid) throw new BadRequestError('Invalid company number')

  const employeeNumber = req.params.employeeNumber
  const isValidEmployeeNumber =
    employeeNumberService.isValidEmployeeNumber(employeeNumber)
  if (!isValidEmployeeNumber)
    throw new BadRequestError('Invalid employee number')

  const company = await companyService.getCompanyByNumber(companyNumber)
  if (!company) {
    res.status(404).json({
      success: false,
      message: 'Company not found',
      data: {},
    })
    return
  }

  const data = req.body
  const { firstName, lastName, ID, departmentName, position } = data

  const employeeDoc = await employeeService.getEmployeeDoc(
    companyNumber,
    employeeNumber
  )
  // TODO this function used also to create new employee if not exists, need to refactor to only update
  if (!employeeDoc) {
    const companyDoc = await companyService.getCompanyDocByNumber(companyNumber)
    if (!companyDoc) {
      res.status(404).json({
        success: false,
        message: 'Company not found',
        data: {},
      })
      return
    }

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
    if (!departmentDoc) {
      res.status(404).json({
        success: false,
        message: 'Department not found',
        data: {},
      })
      return
    }

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
  const identifier = getIdentifierFromALS()

  const companyNumber = req.params.companyNumber
  const isValidCompanyNumber =
    companyNumberService.isValidCompanyNumber(companyNumber)
  if (!isValidCompanyNumber) throw new BadRequestError('Invalid company number')

  const company = await companyService.getCompanyByNumber(companyNumber)
  if (!company) {
    res.status(404).json({
      success: false,
      message: 'Company not found',
      data: {},
    })
    return
  }

  const employeeNumber = req.params.employeeNumber
  const isValidEmployeeNumber =
    employeeNumberService.isValidEmployeeNumber(employeeNumber)
  if (!isValidEmployeeNumber)
    throw new BadRequestError('Invalid employee number')

  const employeeDoc = await employeeService.getEmployeeDoc(
    companyNumber,
    employeeNumber
  )
  if (!employeeDoc) {
    res.status(404).json({
      success: false,
      message: 'Employee not found',
      data: {},
    })
    return
  }

  const accountDoc = await accountService.getEmployeeAccountDoc(employeeDoc._id)
  // employee has account
  if (accountDoc) await accountService.disconnectEmployee(accountDoc._id)
  // employee has no account
  if (!accountDoc) await profileService.deleteProfile(employeeDoc.profile)

  await employeeService.deleteEmployee(employeeDoc._id)

  res.status(200).json({
    success: true,
    message: 'An employee has been deleted.',
    data: {},
  })
}
