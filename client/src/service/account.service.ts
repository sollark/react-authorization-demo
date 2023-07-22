import { Account } from '@/models/Account'
import { Organization } from '@/models/Organization'
import { User } from '@/models/User'
import { httpService } from './axios/http.service'
import { storeService } from './store.service'

async function update(
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

export const accountService = { update }
