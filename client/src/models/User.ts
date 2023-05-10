import { z } from 'zod'
import { Workplace, WorkplaceSchema } from './Workplace'

export interface User {
  email: string
  isProfileComplete: boolean
  profile: {
    name: string
    lastname: string
    workplace: Workplace[]
  }
}

export const UserSchema = z.object({
  email: z.string(),
  isProfileComplete: z.boolean(),
  profile: z.object({
    name: z.string(),
    lastname: z.string(),
    workplace: z.array(WorkplaceSchema),
  }),
})

export interface Auth {
  isAuth: boolean
}

export interface AuthCredentials {
  email: string
  password: string
}
