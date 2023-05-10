import { z } from 'zod'
import { User, UserSchema } from '../User'

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: UserSchema,
})
