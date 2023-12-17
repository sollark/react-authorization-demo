import { Account } from '@/models/Account'
import { Company } from '@/models/Company'
import { Department } from '@/models/Department'
import { Employee } from '@/models/Employee'
import { Profile } from '@/models/Profile'
import { ApiResponse } from '@/models/response/ApiResponse'
import { httpService } from './axios/http.service'
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
  const response = await httpService.post<
    Profile & Partial<Company> & Partial<Department> & Partial<Employee>,
    ApiResponse<AccountData>
  >('account/update', {
    firstName,
    lastName,
    ID,
    companyName,
    departmentName,
    position,
  })

  console.log('accountService - update, response', response)

  const { success, message, data } = response.data
  if (!success) {
    console.log(message)
    return null
  }

  const { account } = data
  storeService.saveAccount(account)

  return account
}

async function joinCompany(companyNumber: string, employeeNumber: string) {
  const response = await httpService.post<
    Partial<Company> & Partial<Employee>,
    ApiResponse<AccountData>
  >('account/join', {
    companyNumber,
    employeeNumber,
  })

  console.log('accountService - joinCompany, response data', response)

  const { success, message, data } = response.data
  if (!success) {
    console.log(message)
    return null
  }

  const { account } = data
  storeService.saveAccount(account)

  return account
}

async function getAccount(): Promise<Account | null> {
  const response = await httpService.get<null, ApiResponse<AccountData>>(
    'account',
    null
  )

  console.log('accountService - getAccount, response', response)

  const { success, message, data } = response.data
  if (!success) {
    console.log(message)
    return null
  }

  const { account } = data
  storeService.saveAccount(account)

  return account
}

export const accountService = { updateAccount, joinCompany, getAccount }
