import { Account, Role, Status } from '@/models/Account'
import { Company } from '@/models/Company'
import { ApiResponse } from '@/models/response/ApiResponse'
import { httpService } from './axios/http.service'
import { Employee } from '@/models/Employee'

async function getBasicCompanyData(): Promise<Company | null> {
  const response = await httpService.get<null, Company>('company/basic', null)

  console.log('companyService - getBasicCompanyData, response.data', response)

  const { success, message, data } = response as any
  if (!success) {
    console.log(message)
    return null
  }

  return data.basicCompanyData
}

async function getAdvancedCompanyData(): Promise<Company | null> {
  const response = await httpService.get<null, ApiResponse>('company', null)

  console.log('companyService - getBasicCompanyData, response', response)

  const { success, message, data } = response as any
  if (!success) {
    console.log(message)
    return null
  }

  return data.company
}

async function getEmployeeAccountData(): Promise<Partial<Account>[] | null> {
  const response = await httpService.get<null, ApiResponse>(
    'company/accounts',
    null
  )

  console.log('companyService- getEmployeeAccountData, response', response)

  const { success, message, data } = response as any
  if (!success) {
    console.log(message)
    return null
  }

  return data.accounts
}

async function updateEmployeeAccount(
  companyNumber: string,
  firstName: string,
  lastName: string,
  ID: string,
  employeeNumber: string,
  role: Role,
  status: Status
): Promise<Partial<Account> | null> {
  console.log(
    'companyService- updateEmployeeAccount',
    companyNumber,
    firstName,
    lastName,
    ID,
    employeeNumber,
    role,
    status
  )

  const response = await httpService.put<
    Partial<Employee> & Partial<Account> & Partial<Company>,
    ApiResponse
  >('company/accounts', { employeeNumber, role, status })

  console.log('companyService - updateEmployeeAccount, response', response)

  const { success, message, data } = response as any
  if (!success) {
    console.log(message)
    return null
  }

  return data.accounts
}

export const companyService = {
  getBasicCompanyData,
  getAdvancedCompanyData,
  getEmployeeAccountData,
  updateEmployeeAccount,
}
