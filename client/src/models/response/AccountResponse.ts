import { Account } from '../Account'

export interface AccountResponse {
  account: Account
}

export function isAccountResponse(obj: any): obj is AccountResponse {
  return obj && typeof obj === 'object' && 'account' in obj
}
