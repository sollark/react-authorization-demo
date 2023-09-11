import { Profile } from './Profile'
import { UserRole } from './Role'
import { Workplace } from './Workplace'

export const ACCOUNT_STATUS = {
  unregistered: 'Unregistered',
  pending: 'Pending',
  active: 'Active',
  inactive: 'Inactive',
  deleted: 'Deleted',
} as const
export type Status = keyof typeof ACCOUNT_STATUS

export type Account = {
  profile: Profile
  workplace?: Workplace
  isComplete: boolean
  role: UserRole
  status: Status
}
