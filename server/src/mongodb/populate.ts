import { authService } from '../api/auth/auth.service.js'
import { companyService } from '../api/company/company.service.js'
import { employeeService } from '../api/employee/employee.service.js'
import { profileService } from '../api/profile/profile.service.js'
import { departmentService } from '../service/department.service.js'

async function populateTestData() {
  console.log('Populating users in the database...')

  authService.registration({
    email: 'employee@test.com',
    password: 'employee',
  })
  console.log('Populating test company in the database...')

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
  if (!salesDepartment || !hrDepartment) {
    console.log('Failed to create department')
    return
  }

  // Add departments to company
  companyService.addDepartment(company._id, salesDepartment._id)
  companyService.addDepartment(company._id, hrDepartment._id)

  // Profiles
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
    console.log('Failed to create profile')
    return
  }

  // Employees
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
  companyService.addEmployee(company._id, employee1._id)
  companyService.addEmployee(company._id, employee2._id)
  companyService.addEmployee(company._id, employee3._id)
  companyService.addEmployee(company._id, employee4._id)
}

export const populate = { populateTestData }
