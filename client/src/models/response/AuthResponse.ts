import { Account } from '../Account'

export interface AuthResponse {
  accessToken: string
  account: Account
}

export function isAuthResponse(obj: any): obj is AuthResponse {
  return (
    obj && typeof obj === 'object' && 'account' in obj && 'accessToken' in obj
  )
}

// export const AuthResponseSchema = z.object({
//   accessToken: z.string(),
//   refreshToken: z.string(),
//   account: AccountSchema,
// })
