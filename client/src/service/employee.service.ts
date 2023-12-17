import { Account } from '@/models/Account'
import { Company } from '@/models/Company'
import { Department } from '@/models/Department'
import { Employee } from '@/models/Employee'
import { Profile } from '@/models/Profile'
import { ApiResponse } from '@/models/response/ApiResponse'
import { httpService } from './axios/http.service'

// TODO some functions get company number from employee store
// others get company number from parameter
// make it consistent

type AccountData = {
  account: Account
}

type AllEmployeeData = {
  employees: Employee[]
}

async function updateCompanyEmployee(
  companyNumber: string,
  firstName: string,
  lastName: string,
  ID: string,
  departmentName: string,
  employeeNumber: string,
  position: string
) {
  const response = await httpService.put<
    Profile & Partial<Company> & Partial<Department> & Partial<Employee>,
    ApiResponse<AccountData>
  >(`company/${companyNumber}/employees/${employeeNumber}`, {
    firstName,
    lastName,
    ID,
    departmentName,
    position,
  })

  console.log('employeeService - updateCompanyEmployee, response:', response)

  const { success, message, data } = response.data
  if (!success) {
    console.log(message)
    return null
  }
  const { account } = data

  return account
}

async function deleteCompanyEmployee(
  companyNumber: string,
  employeeNumber: string
) {
  const response = await httpService.delete<null, ApiResponse<null>>(
    `company/${companyNumber}/employees/${employeeNumber}`,
    null
  )

  console.log('employeeService - deleteCompanyEmployee, response: ', response)

  const { success, message, data } = response.data
  if (!success) {
    console.log(message)
    return false
  }

  return true
}

async function getAllEmployees(): Promise<Employee[] | null> {
  const response = await httpService.get<null, ApiResponse<AllEmployeeData>>(
    'employee/all',
    null
  )

  console.log('employeeService - getAllEmployees, response: ', response)

  const { success, message, data } = response.data
  if (!success) {
    console.log(message)
    return null
  }
  const employees = data.employees

  return employees
}

export const employeeService = {
  updateCompanyEmployee,
  deleteCompanyEmployee,
  getAllEmployees,
}
