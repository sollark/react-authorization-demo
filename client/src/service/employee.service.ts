import { Account } from '@/models/Account'
import { Company } from '@/models/Company'
import { Department } from '@/models/Department'
import { Employee } from '@/models/Employee'
import { Profile } from '@/models/Profile'
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
  const data = await httpService.put<
    Profile & Partial<Company> & Partial<Department> & Partial<Employee>,
    AccountData
  >(`company/${companyNumber}/employees/${employeeNumber}`, {
    firstName,
    lastName,
    ID,
    departmentName,
    position,
  })

  console.log('employeeService - updateCompanyEmployee, data:', data)

  return data?.account || null
}

async function deleteCompanyEmployee(
  companyNumber: string,
  employeeNumber: string
) {
  const data = await httpService.delete<null, null>(
    `company/${companyNumber}/employees/${employeeNumber}`,
    null
  )

  console.log('employeeService - deleteCompanyEmployee, data: ', data)

  return true
}

async function getAllEmployees(): Promise<Employee[] | null> {
  const data = await httpService.get<null, AllEmployeeData>(
    'employee/all',
    null
  )

  console.log('employeeService - getAllEmployees, data: ', data)

  return data?.employees || null
}

export const employeeService = {
  updateCompanyEmployee,
  deleteCompanyEmployee,
  getAllEmployees,
}
