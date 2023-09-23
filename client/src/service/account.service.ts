import { Account } from '@/models/Account'
import { Company } from '@/models/Company'
import { Department } from '@/models/Department'
import { Profile } from '@/models/Profile'
import { httpService } from './axios/http.service'
import { storeService } from './store.service'

async function updateAccount(
  firstName: string,
  lastName: string,
  ID: string,
  companyName?: string,
  departmentName?: string
) {
  const response = await httpService.post<
    Profile & Partial<Company> & Partial<Department>,
    Account
  >('account/update', {
    firstName,
    lastName,
    ID,
    companyName,
    departmentName,
  })

  console.log('accountService - update, response data', response)

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

export const accountService = { updateAccount, getAccount }
