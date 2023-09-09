import { Account } from '@/models/Account'
import { Company } from '@/models/Company'
import { Profile } from '@/models/Profile'
import { Workplace } from '@/models/Workplace'
import { httpService } from './axios/http.service'
import { storeService } from './store.service'
import { Department } from '@/models/Department'

async function updateAccount(
  firstName: string,
  lastName: string,
  companyName?: string,
  departmentName?: string
) {
  const response = await httpService.post<
    Profile & Partial<Company> & Partial<Department>,
    Account
  >('account/update', {
    firstName,
    lastName,
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
