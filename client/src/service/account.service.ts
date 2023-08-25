import { Account } from '@/models/Account'
import { Company } from '@/models/Company'
import { User } from '@/models/User'
import { httpService } from './axios/http.service'
import { storeService } from './store.service'

async function updateAccount(
  firstName: string,
  lastName: string,
  companyName?: string,
  companyCode?: string
) {
  const response = await httpService.post<User & Partial<Company>, Account>(
    'account/update',
    {
      firstName,
      lastName,
      companyName,
      companyCode,
    }
  )

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
