import { Account, Role, Status } from '@/models/Account'
import { Employee } from '@/models/Employee'
import useCompanyStore from '@/stores/companyStore'
import {
  FailedResponse,
  SuccessfulResponse,
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

  const response = await httpService.get<CompanyEmployeeList>(
    `company/${companyNumber}/employees/basicTableData`
  )

  const { success, message } = response
  if (!success) {
    log('companyService - getBasicCompanyData, message', message)
    return null
  }
  const data = getDataFromResponse(
    response,
    'employeeService - getCompanyEmployeeBasicData'
  )
  return data?.employees || null
}

async function getCompanyEmployeeAdvancedData(): Promise<Employee[] | null> {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()

  const response = await httpService.get<CompanyEmployeeList>(
    `company/${companyNumber}/employees/advancedTableData`
  )

  const data = getDataFromResponse(
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

  const response = await httpService.put<AccountData>(
    `company/${companyNumber}/employees/${employeeNumber}`,
    {
      firstName,
      lastName,
      ID,
      departmentName,
      position,
    }
  )

  const data = getDataFromResponse(
    response,
    'employeeService - updateCompanyEmployee'
  )

  return data?.account || null
}

async function deleteCompanyEmployee(employeeNumber: string) {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()
  const response = await httpService.delete<null>(
    `company/${companyNumber}/employees/${employeeNumber}`
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

  const response = await httpService.get<EmployeeAccountData>(
    `company/${companyNumber}/accounts`
  )

  const data = getDataFromResponse(
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

  const response = await httpService.put<UpdateEmployeeAccountData>(
    `company/${companyNumber}/accounts/${employeeNumber}`,
    { role, status }
  )

  const data = getDataFromResponse(
    response,
    'employeeService - updateEmployeeAccount'
  )

  return data?.accounts || null
}

async function getAllEmployees(): Promise<Employee[] | null> {
  const response = await httpService.get<AllEmployeeData>('employee/all')

  const data = getDataFromResponse(
    response,
    'employeeService - getAllEmployees'
  )

  return data?.employees || null
}

async function getCompanyEmployeeNumber(): Promise<string | null> {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()

  const response = await httpService.get<{ employeeNumber: string }>(
    `company/${companyNumber}/employees/employeeNumber`
  )

  const data = getDataFromResponse(
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

function getDataFromResponse<T>(
  response: FailedResponse | SuccessfulResponse<T>,
  functionName: string
): T | null {
  if (!response.success) {
    log(`${functionName}, error in response`, response.message)
    return null
  }

  return response.data || null
}
