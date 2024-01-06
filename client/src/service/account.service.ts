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
type RegistrationData = Partial<Profile> &
  Partial<Company> &
  Partial<Department> &
  Partial<Employee>

async function updateAccount(
  firstName: string,
  lastName: string,
  ID: string,
  companyName: string,
  departmentName: string,
  position: string
) {
  const response = await httpService.post<RegistrationData, AccountData>(
    'account/update',
    {
      firstName,
      lastName,
      ID,
      companyName,
      departmentName,
      position,
    }
  )

  log('accountService - updateAccount, response', response)
  if (response && response.success) {
    const { account } = response.data
    storeService.saveAccount(account)

    return account
  }
  return null
}

async function joinCompany(companyNumber: string, employeeNumber: string) {
  const response = await httpService.post<
    Partial<Company> & Partial<Employee>,
    AccountData
  >('account/join', {
    companyNumber,
    employeeNumber,
  })

  log('accountService - joinCompany, response', response)

  if (response && response.success) {
    const { account } = response.data
    storeService.saveAccount(account)

    return account
  }

  return null
}

async function getAccount(): Promise<Account | null> {
  const response = await httpService.get<null, AccountData>('account', null)

  log('accountService - getAccount, response', response)

  if (response && response.success) {
    const { account } = response.data
    storeService.saveAccount(account)

    return account
  }

  return null
}

export const accountService = { updateAccount, joinCompany, getAccount }
