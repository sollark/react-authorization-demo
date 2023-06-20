import { z } from 'zod'
import { Account, AccountSchema } from '../Account'

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  account: Account
}

export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  account: AccountSchema,
})
