import { Account, Role, Status } from '@/models/Account'
import { Company } from '@/models/Company'
import { Department } from '@/models/Department'
import { Employee } from '@/models/Employee'
import { Profile } from '@/models/Profile'
import useCompanyStore from '@/stores/companyStore'
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  httpService,
} from './axios/http.service'
import { log } from './console.service'

type AccountData = {
  account: Account
}

type EmployeeAccountData = {
  accounts: Partial<Account>[]
}

type UpdateEmployeeAccountData = {
  accounts: Partial<Account>
}

type CompanyEmployeeList = {
  employees: Employee[]
}

type AllEmployeeData = {
  employees: Employee[]
}

async function getCompanyEmployeeBasicData(): Promise<Employee[] | null> {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()

  const response = await httpService.get<null, CompanyEmployeeList>(
    `company/${companyNumber}/employees/basicTableData`,
    null
  )

  const data = handleResponse(
    response,
    'employeeService - getCompanyEmployeeBasicData'
  )
  return data?.employees || null
}

async function getCompanyEmployeeAdvancedData(): Promise<Employee[] | null> {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()

  const response = await httpService.get<null, CompanyEmployeeList>(
    `company/${companyNumber}/employees/advancedTableData`,
    null
  )

  const data = handleResponse(
    response,
    'employeeService - getCompanyEmployeeAdvancedData'
  )

  return data?.employees || null
}

async function updateCompanyEmployee(
  firstName: string,
  lastName: string,
  ID: string,
  departmentName: string,
  employeeNumber: string,
  position: string
) {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()

  const response = await httpService.put<
    Profile & Partial<Company> & Partial<Department> & Partial<Employee>,
    AccountData
  >(`company/${companyNumber}/employees/${employeeNumber}`, {
    firstName,
    lastName,
    ID,
    departmentName,
    position,
  })

  const data = handleResponse(
    response,
    'employeeService - updateCompanyEmployee'
  )

  return data?.account || null
}

async function deleteCompanyEmployee(employeeNumber: string) {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()
  const response = await httpService.delete<null, null>(
    `company/${companyNumber}/employees/${employeeNumber}`,
    null
  )

  log('employeeService - deleteCompanyEmployee, response: ', response)

  if (!response) {
    log('employeeService - deleteCompanyEmployee, no response from the server')
    return false
  }

  const { success, message } = response
  if (!success) {
    log('employeeService - deleteCompanyEmployee, message', message)
    return false
  }

  log('employeeService - deleteCompanyEmployee, success')

  return true
}

async function getEmployeeAccountData(): Promise<Partial<Account>[] | null> {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()

  const response = await httpService.get<null, EmployeeAccountData>(
    `company/${companyNumber}/accounts`,
    null
  )

  const data = handleResponse(
    response,
    'employeeService - getEmployeeAccountData'
  )

  return data?.accounts || null
}

async function updateEmployeeAccount(
  employeeNumber: string,
  role: Role,
  status: Status
): Promise<Partial<Account> | null> {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()

  const response = await httpService.put<
    Partial<Account>,
    UpdateEmployeeAccountData
  >(`company/${companyNumber}/accounts/${employeeNumber}`, { role, status })

  const data = handleResponse(
    response,
    'employeeService - updateEmployeeAccount'
  )

  return data?.accounts || null
}

async function getAllEmployees(): Promise<Employee[] | null> {
  const response = await httpService.get<null, AllEmployeeData>(
    'employee/all',
    null
  )

  const data = handleResponse(response, 'employeeService - getAllEmployees')

  return data?.employees || null
}

async function getCompanyEmployeeNumber(): Promise<string | null> {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()

  const response = await httpService.get<null, { employeeNumber: string }>(
    `company/${companyNumber}/employees/employeeNumber`,
    null
  )

  const data = handleResponse(
    response,
    'employeeService - getCompanyEmployeeNumber'
  )

  return data?.employeeNumber || null
}

export const employeeService = {
  getCompanyEmployeeBasicData,
  getCompanyEmployeeAdvancedData,
  updateCompanyEmployee,
  deleteCompanyEmployee,
  getEmployeeAccountData,
  updateEmployeeAccount,
  getAllEmployees,
  getCompanyEmployeeNumber,
}

function handleResponse<T>(
  response: ApiSuccessResponse<T> | ApiErrorResponse | null,
  functionName: string
): T | null {
  if (!response) {
    log(`${functionName}, no response from the server`)
    return null
  }

  if (!response.success) {
    log(`${functionName}, message`, response.message)
    return null
  }

  return response.data || null
}
