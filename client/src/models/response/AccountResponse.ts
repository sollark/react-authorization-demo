import { Account } from '../Account'

export interface AccountResponse {
  accessToken: string
  account: Account
}

export function isAccountResponse(obj: any): obj is AccountResponse {
  return obj && typeof obj === 'object' && 'account' in obj
}
