import { z } from 'zod'

export interface User {
  firstName: string
  lastname: string
}

export const UserDetailsSchema = z.object({
  firstName: z.string(),
  lastname: z.string(),
})
