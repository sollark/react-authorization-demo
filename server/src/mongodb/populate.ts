import { authService } from '../api/auth/auth.service.js'
import { companyService } from '../api/company/company.service.js'
import { employeeService } from '../api/employee/employee.service.js'
import { profileService } from '../api/profile/profile.service.js'
import { departmentService } from '../service/department.service.js'

async function populateTestData() {
  console.log('Populating test data in the database...')

  // register user, manager, supervisor and admin
  authService.registration({
    email: 'user@test.com',
    password: 'user',
  })
  authService.registration({
    email: 'manager@test.com',
    password: 'manager',
  })
  authService.registration({
    email: 'supervisor@test.com',
    password: 'supervisor',
  })
  authService.registration({
    email: 'admin@test.com',
    password: 'admin',
  })

  // Company
  const company = await companyService.createCompany('TestCompany')
  if (!company) {
    console.log('Failed to create company')
    return
  }

  // Departments
  const salesDepartment = await departmentService.createDepartment(
    company._id,
    'Sales'
  )

  const hrDepartment = await departmentService.createDepartment(
    company._id,
    'Human Resources'
  )

  const itDepartment = await departmentService.createDepartment(
    company._id,
    'Information Technology'
  )

  const productionDepartment = await departmentService.createDepartment(
    company._id,
    'Production'
  )

  const managementDepartment = await departmentService.createDepartment(
    company._id,
    'Management'
  )

  if (
    !salesDepartment ||
    !hrDepartment ||
    !itDepartment ||
    !productionDepartment ||
    !managementDepartment
  ) {
    console.log('Failed to create department')
    return
  }

  // Add departments to company
  companyService.addDepartment(company._id, salesDepartment._id)
  companyService.addDepartment(company._id, hrDepartment._id)
  companyService.addDepartment(company._id, itDepartment._id)
  companyService.addDepartment(company._id, productionDepartment._id)
  companyService.addDepartment(company._id, managementDepartment._id)

  // Manager, supervisor and admin profiles
  const managerProfile = await profileService.createProfile({
    firstName: 'Test',
    lastName: 'Manager',
    ID: '5555555555',
  })

  const supervisorProfile = await profileService.createProfile({
    firstName: 'Test',
    lastName: 'Supervisor',
    ID: '6666666666',
  })

  const adminProfile = await profileService.createProfile({
    firstName: 'Test',
    lastName: 'Admin',
    ID: '7777777777',
  })
  if (!managerProfile || !supervisorProfile || !adminProfile) {
    console.log('Failed to create manager, supervisor and admin profiles')
    return
  }

  // Employees' profiles
  const profile1 = await profileService.createProfile({
    firstName: 'Test',
    lastName: 'Employee1',
    ID: '1111111111',
  })
  const profile2 = await profileService.createProfile({
    firstName: 'Test',
    lastName: 'Employee2',
    ID: '2222222222',
  })
  const profile3 = await profileService.createProfile({
    firstName: 'Test',
    lastName: 'Employee3',
    ID: '3333333333',
  })
  const profile4 = await profileService.createProfile({
    firstName: 'Test',
    lastName: 'Employee4',
    ID: '4444444444',
  })
  if (!profile1 || !profile2 || !profile3 || !profile4) {
    console.log('Failed to create employee profiles')
    return
  }

  // Create manager employee (production director)
  const managerEmployee = await employeeService.createEmployee(
    managerProfile._id,
    company._id,
    productionDepartment._id,
    'Production Director'
  )

  // Create supervisor employee (factory director)
  const supervisorEmployee = await employeeService.createEmployee(
    supervisorProfile._id,
    company._id,
    managementDepartment._id,
    'Factory Director'
  )

  if (!managerEmployee || !supervisorEmployee) {
    console.log('Failed to create employee')
    return
  }

  // Create user employees
  const employee1 = await employeeService.createEmployee(
    profile1._id,
    company._id,
    salesDepartment._id,
    'Sales Representative'
  )
  const employee2 = await employeeService.createEmployee(
    profile2._id,
    company._id,
    salesDepartment._id,
    'Sales Associate'
  )
  const employee3 = await employeeService.createEmployee(
    profile3._id,
    company._id,
    hrDepartment._id,
    'HR Manager'
  )
  const employee4 = await employeeService.createEmployee(
    profile4._id,
    company._id,
    hrDepartment._id,
    'HR Specialist'
  )
  if (!employee1 || !employee2 || !employee3 || !employee4) {
    console.log('Failed to create employee')
    return
  }

  // Add employees to company
  companyService.addEmployee(company._id, managerEmployee._id)
  companyService.addEmployee(company._id, supervisorEmployee._id)
  companyService.addEmployee(company._id, employee1._id)
  companyService.addEmployee(company._id, employee2._id)
  companyService.addEmployee(company._id, employee3._id)
  companyService.addEmployee(company._id, employee4._id)

  // Add employees to departments
  departmentService.addEmployee(salesDepartment._id, employee1._id)
  departmentService.addEmployee(salesDepartment._id, employee2._id)
  departmentService.addEmployee(hrDepartment._id, employee3._id)
  departmentService.addEmployee(hrDepartment._id, employee4._id)
  departmentService.addEmployee(productionDepartment._id, managerEmployee._id)
  departmentService.addEmployee(
    managementDepartment._id,
    supervisorEmployee._id
  )
}

export const populate = { populateTestData }
