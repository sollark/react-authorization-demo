import { Employee } from './Employee'
import { Profile } from './Profile'
import { Role } from './Role'

export type Status = 'Pending' | 'Active' | 'Inactive' | 'Deleted'

export const ACCOUNT_STATUS = {
  pending: 'Pending' as Status,
  active: 'Active' as Status,
  inactive: 'Inactive' as Status,
  deleted: 'Deleted' as Status,
} as const

export type Account = {
  profile: Profile
  employee?: Employee
  isComplete: boolean
  role: Role
  status: Status
}
