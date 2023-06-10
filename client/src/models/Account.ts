import { z } from 'zod'
import { OrganizationSchema } from './Organization'
import { User, UserDetailsSchema } from './User'
import { Workspace } from './Workspace'

export interface Account {
  isComplete: boolean
  user: User
  workspaces: Workspace
}

export const AccountSchema = z
  .object({})
  .merge(UserDetailsSchema)
  .merge(OrganizationSchema)
