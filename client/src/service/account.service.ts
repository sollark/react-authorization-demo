import { Account } from '@/models/Account'
import { Company } from '@/models/Company'
import { Department } from '@/models/Department'
import { Employee } from '@/models/Employee'
import { Profile } from '@/models/Profile'
import { httpService } from './axios/http.service'
import { storeService } from './store.service'

async function updateAccount(
  firstName: string,
  lastName: string,
  ID: string,
  companyName: string,
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
    companyName,
    departmentName,
    position,
  })

  console.log('accountService - update, response data', response)

  const { account } = response as any
  if (account) storeService.saveAccount(account)

  return account ? account : null
}

async function joinCompany(companyNumber: string, employeeNumber: string) {
  const response = await httpService.post<
    Partial<Company> & Partial<Employee>,
    Account
  >('account/join', {
    companyNumber,
    employeeNumber,
  })

  console.log('accountService - joinCompany, response data', response)

  const { account } = response as any
  if (account) storeService.saveAccount(account)

  return account ? account : null
}

async function getAccount(): Promise<Account | null> {
  const response = await httpService.get<null, Account>('account/get', null)

  console.log('accountService - getAccount, response data', response)

  const { account } = response as any
  if (account) storeService.saveAccount(account)

  return account ? account : null
}

export const accountService = { updateAccount, joinCompany, getAccount }
