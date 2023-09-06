import { Profile } from './Profile'
import { UserRole } from './Role'
import { workplace } from './workplace'

export const ACCOUNT_STATUS = {
  pending: 'pending',
  active: 'active',
  inactive: 'inactive',
  deleted: 'deleted',
} as const
export type Status = keyof typeof ACCOUNT_STATUS

export type Account = {
  profile: Profile
  workplace?: workplace
  isComplete: boolean
  role: UserRole
  status: Status
}
