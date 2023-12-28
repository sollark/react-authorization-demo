import { Account } from '@/models/Account'
import { Company } from '@/models/Company'
import { Department } from '@/models/Department'
import { Employee } from '@/models/Employee'
import { Profile } from '@/models/Profile'
import { httpService } from './axios/http.service'
import { log } from './console.service'
import { storeService } from './store.service'

type AccountData = {
  account: Account
}

async function updateAccount(
  firstName: string,
  lastName: string,
  ID: string,
  companyName: string,
  departmentName: string,
  position: string
) {
  const data = await httpService.post<
    Profile & Partial<Company> & Partial<Department> & Partial<Employee>,
    AccountData
  >('account/update', {
    firstName,
    lastName,
    ID,
    companyName,
    departmentName,
    position,
  })

  log('accountService - updateAccount, data', data)

  if (!data) return null

  const { account } = data
  storeService.saveAccount(account)

  return account
}

async function joinCompany(companyNumber: string, employeeNumber: string) {
  const data = await httpService.post<
    Partial<Company> & Partial<Employee>,
    AccountData
  >('account/join', {
    companyNumber,
    employeeNumber,
  })

  log('accountService - joinCompany, data', data)

  if (!data) return null

  const { account } = data
  storeService.saveAccount(account)

  return account
}

async function getAccount(): Promise<Account | null> {
  const data = await httpService.get<null, AccountData>('account', null)

  log('accountService - getAccount, data', data)

  if (!data) return null

  const { account } = data
  storeService.saveAccount(account)

  return account
}

export const accountService = { updateAccount, joinCompany, getAccount }
