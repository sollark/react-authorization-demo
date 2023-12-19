import { Account, Role, Status } from '@/models/Account'
import { Company } from '@/models/Company'
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
  const companyNumber = useEmployeeStore.getState().getCompanyNumber()

  const data = await httpService.get<null, BasicCompanyData>(
    `company/${companyNumber}/basic`,
    null
  )

  console.log('companyService - getBasicCompanyData, data', data)

  return data?.basicCompanyData || null
}

async function getAdvancedCompanyData(): Promise<Company | null> {
  const companyNumber = useEmployeeStore.getState().getCompanyNumber()

  const data = await httpService.get<null, AdvancedCompanyData>(
    `company/${companyNumber}`,
    null
  )

  console.log('companyService - getAdvancedCompanyData, data', data)

  return data?.company || null
}

async function getEmployeeAccountData(): Promise<Partial<Account>[] | null> {
  const companyNumber = useEmployeeStore.getState().getCompanyNumber()

  const data = await httpService.get<null, EmployeeAccountData>(
    `company/${companyNumber}/accounts`,
    null
  )

  console.log('companyService- getEmployeeAccountData, data', data)

  return data?.accounts || null
}

async function updateEmployeeAccount(
  employeeNumber: string,
  role: Role,
  status: Status
): Promise<Partial<Account> | null> {
  const companyNumber = useEmployeeStore.getState().getCompanyNumber()

  const data = await httpService.put<
    Partial<Account>,
    UpdateEmployeeAccountData
  >(`company/${companyNumber}/accounts/${employeeNumber}`, { role, status })

  console.log('companyService - updateEmployeeAccount, data', data)

  return data?.accounts || null
}

export const companyService = {
  getBasicCompanyData,
  getAdvancedCompanyData,
  getEmployeeAccountData,
  updateEmployeeAccount,
}
