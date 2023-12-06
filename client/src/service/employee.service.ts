import { Account } from '@/models/Account'
import { Company } from '@/models/Company'
import { Department } from '@/models/Department'
import { Employee } from '@/models/Employee'
import { Profile } from '@/models/Profile'
import { ApiResponse } from '@/models/response/ApiResponse'
import { HttpResponse, httpService } from './axios/http.service'
import { storeService } from './store.service'

async function updateEmployee(
  firstName: string,
  lastName: string,
  ID: string,
  departmentName: string,
  position: string
) {
  const response = await httpService.post<
    Profile & Partial<Company> & Partial<Department> & Partial<Employee>,
    Account
  >('account/update', {
    firstName,
    lastName,
    ID,
    departmentName,
    position,
  })

  console.log('accountService- updateEmployee, response data', response)

  const { account } = response as any
  if (account) storeService.saveAccount(account)

  return account ? account : null
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
  console.log(
    'employeeService- updateCompanyEmployee',
    companyNumber,
    firstName,
    lastName,
    ID,
    departmentName,
    employeeNumber,
    position
  )

  const response = await httpService.post<
    Profile & Partial<Company> & Partial<Department> & Partial<Employee>,
    Account
  >('company/updateEmployee', {
    companyNumber,
    firstName,
    lastName,
    ID,
    departmentName,
    employeeNumber,
    position,
  })

  console.log('accountService- updateCompanyEmployee, response data:', response)

  const { account } = response as any
  if (account) storeService.saveAccount(account)

  return account ? account : null
}

async function deleteCompanyEmployee(
  companyNumber: string,
  employeeNumber: string
) {
  const response = await httpService.delete<
    Partial<Company> & Partial<Employee>,
    ApiResponse
  >('company/deleteEmployee', {
    companyNumber,
    employeeNumber,
  })

  console.log('accountService- deleteCompanyEmployee, response data', response)

  return true
}

// TODO this function is meant to be used by the admin to get all employees in database
async function getAllEmployees(): Promise<Employee[] | null> {
  const response = await httpService.get<null, Employee[]>(
    'company/employees',
    null
  )

  console.log('employeeService - getAllEmployees, response.data', response)

  const { success, message, data } = response as any
  const employees = data.employees

  return employees ? employees : null
}

async function getCompany(): Promise<Company | null> {
  const response = await httpService.get<null, HttpResponse>('company', null)

  console.log('employeeService - getCompany, response.data', response)

  const { success, message, data } = response as any

  return data.company ? data.company : null
}
export const employeeService = {
  updateEmployee,
  updateCompanyEmployee,
  deleteCompanyEmployee,
  getCompany,
  getAllEmployees,
}
