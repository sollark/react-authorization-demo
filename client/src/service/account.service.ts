import { Account } from '@/models/Account'
import { User } from '@/models/User'
import { httpService } from './axios/http.service'
import { Organization } from '@/models/Organization'
import useAccountStore from '@/stores/accountStore'

async function update(
  firstName: string,
  lastName: string,
  organizationName?: string,
  organizationCode?: string
) {
  //  :Promise<Account>
  const response = await httpService.post<User & Organization, Account>(
    'account/update',
    {
      firstName,
      lastName,
      organizationName,
      organizationCode,
    }
  )

  console.log('response data', response)

  const { account } = response as any

  if (account?.isComplete) useAccountStore.setState({ isComplete: true })

  return account ? account : null
}

export const accountService = { update }
