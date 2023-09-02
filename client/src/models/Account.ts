import { Profile } from './Profile'
import { Role } from './Role'
import { Workspace } from './Workspace'

export const ACCOUNT_STATUS = {
  pending: 'pending',
  active: 'active',
  inactive: 'inactive',
  deleted: 'deleted',
} as const
export type Status = keyof typeof ACCOUNT_STATUS

export type Account = {
  profile: Profile
  workspace?: Workspace
  isComplete: boolean
  role?: Role
  status: Status
}
