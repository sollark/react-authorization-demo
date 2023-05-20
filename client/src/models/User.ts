import { z } from 'zod'

export interface User {
  identifier: string
  isAccountComplete: boolean
  account: {
    firstName: string
    lastname: string
  }
}

export const UserDetailsSchema = z.object({
  identifier: z.string(),
  isAccountComplete: z.boolean(),
  account: z.object({
    firstName: z.string(),
    lastname: z.string(),
    // workplace: z.array(WorkplaceSchema),
  }),
})
