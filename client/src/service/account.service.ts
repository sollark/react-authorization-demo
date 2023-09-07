import { Account } from '@/models/Account'
import { Company } from '@/models/Company'
import { Profile } from '@/models/Profile'
import { httpService } from './axios/http.service'
import { storeService } from './store.service'

async function updateAccount(
  firstName: string,
  lastName: string,
  companyName?: string,
  companyId?: string
) {
  const response = await httpService.post<Profile & Partial<Company>, Account>(
    'account/update',
    {
      firstName,
      lastName,
      companyName,
      companyId,
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
