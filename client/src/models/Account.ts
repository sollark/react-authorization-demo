import { Profile } from './Profile'
import { UserRole } from './Role'
import { Workplace } from './Workplace'

export const ACCOUNT_STATUS = {
  pending: 'pending',
  active: 'active',
  inactive: 'inactive',
  deleted: 'deleted',
} as const
export type Status = keyof typeof ACCOUNT_STATUS

export type Account = {
  profile: Profile
  workplace?: Workplace
  isComplete: boolean
  role: UserRole
  status: Status
}
