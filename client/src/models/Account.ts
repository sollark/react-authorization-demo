import { z } from 'zod'
import { User } from './User'
import { Workspace } from './Workspace'
import { UserDetailsSchema } from './User'
import { WorkspaceSchema } from './Workspace'

export interface Account {
  isComplete: boolean
  user: User
  workspaces: Workspace
}

export const AccountSchema = z.object({
  isAccountComplete: z.boolean(),
  user: UserDetailsSchema,
  workspaces: WorkspaceSchema,
})
