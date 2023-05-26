import { z } from 'zod'
// TODO account is not correct, its just copy from user, need to fix
export interface Account {
  identifier: string
  isAccountComplete: boolean
  account: {
    firstName: string
    lastname: string
  }
}

export const AccountSchema = z.object({
  identifier: z.string(),
  isAccountComplete: z.boolean(),
  account: z.object({
    firstName: z.string(),
    lastname: z.string(),
    // workplace: z.array(WorkplaceSchema),
  }),
})
