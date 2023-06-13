import { Account } from '@/models/Account'
import { User } from '@/models/User'
import { httpService } from './axios/http.service'
import { Organization } from '@/models/Organization'

async function update(
  firstName: string,
  lastName: string,
  organization: string
) {
  //  :Promise<Account>
  const response = await httpService.post<User & Organization, Account>(
    'account/update',
    {
      firstName,
      lastName,
      organization,
    }
  )

  return response ? response : null
}

export const accountService = { update }
