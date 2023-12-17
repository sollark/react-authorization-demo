import { Account, Role, Status } from '@/models/Account'
import { Company } from '@/models/Company'
import { ApiResponse } from '@/models/response/ApiResponse'
import useEmployeeStore from '@/stores/employeeStore'
import { httpService } from './axios/http.service'

type BasicCompanyData = {
  basicCompanyData: Partial<Company>
}

type AdvancedCompanyData = {
  company: Company
}

type EmployeeAccountData = {
  accounts: Partial<Account>[]
}

type UpdateEmployeeAccountData = {
  accounts: Partial<Account>
}

async function getBasicCompanyData(): Promise<Partial<Company> | null> {
  // get company number from employee store
  const companyNumber = useEmployeeStore(
    (state) => state.employee?.company.companyNumber
  )

  const response = await httpService.get<null, ApiResponse<BasicCompanyData>>(
    `company/${companyNumber}/basic`,
    null
  )

  console.log('companyService - getBasicCompanyData, response', response)

  const { success, message, data } = response.data
  if (!success) {
    console.log(message)
    return null
  }

  return data.basicCompanyData
}

async function getAdvancedCompanyData(): Promise<Company | null> {
  // get company number from employee store
  const companyNumber = useEmployeeStore(
    (state) => state.employee?.company.companyNumber
  )

  const response = await httpService.get<
    null,
    ApiResponse<AdvancedCompanyData>
  >(`company/${companyNumber} `, null)

  console.log('companyService - getAdvancedCompanyData, response', response)

  const { success, message, data } = response.data
  if (!success) {
    console.log(message)
    return null
  }

  return data.company
}

async function getEmployeeAccountData(): Promise<Partial<Account>[] | null> {
  // get company number from employee store
  const companyNumber = useEmployeeStore(
    (state) => state.employee?.company.companyNumber
  )

  const response = await httpService.get<
    null,
    ApiResponse<EmployeeAccountData>
  >(`company/${companyNumber}/accounts`, null)

  console.log('companyService- getEmployeeAccountData, response', response)

  const { success, message, data } = response.data
  if (!success) {
    console.log(message)
    return null
  }

  return data.accounts
}

async function updateEmployeeAccount(
  role: Role,
  status: Status
): Promise<Partial<Account> | null> {
  // get company number from employee store
  const companyNumber = useEmployeeStore(
    (state) => state.employee?.company.companyNumber
  )

  const response = await httpService.put<
    Partial<Account>,
    ApiResponse<UpdateEmployeeAccountData>
  >(`company/${companyNumber}/accounts`, { role, status })

  console.log('companyService - updateEmployeeAccount, response', response)

  const { success, message, data } = response.data
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
