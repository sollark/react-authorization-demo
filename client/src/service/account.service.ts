import { Account } from '@/models/Account'
import { Organization } from '@/models/Organization'
import { User } from '@/models/User'
import { httpService } from './axios/http.service'
import { storeService } from './store.service'

async function updateAccount(
  firstName: string,
  lastName: string,
  organizationName?: string,
  organizationCode?: string
) {
  //  :Promise<Account>
  const response = await httpService.post<
    User & Partial<Organization>,
    Account
  >('account/update', {
    firstName,
    lastName,
    organizationName,
    organizationCode,
  })

  console.log('accountService - update, response data', response)

  const { account, accessToken } = response as any

  if (account) storeService.saveAccount(account)
  if (accessToken) storeService.saveAccessToken(accessToken)

  return account ? account : null
}

async function getAccount(): Promise<Account> {
  const response = await httpService.get<null, Account>('account/get', null)

  console.log('accountService - getAccount, response data', response)

  const { account } = response as any
  if (account) storeService.saveAccount(account)

  return account ? account : null
}

export const accountService = { updateAccount, getAccount }
