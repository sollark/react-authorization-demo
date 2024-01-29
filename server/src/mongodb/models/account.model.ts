import { Schema, Types, model } from 'mongoose'
import { Employee } from './employee.model.js'
import { Profile } from './profile.model.js'

export const ACCOUNT_STATUS = {
  incomplete: 'incomplete',
  pending: 'pending',
  active: 'active',
  inactive: 'inactive',
  deleted: 'deleted',
} as const
export type Status = keyof typeof ACCOUNT_STATUS

export const USER_ROLE = {
  guest: 'guest',
  employee: 'employee',
  manager: 'manager',
  supervisor: 'supervisor',
  admin: 'admin',
} as const
export type Role = keyof typeof USER_ROLE

export type Account = {
  uuid: string
  profile: Profile
  status: Status
  isComplete: boolean
  role?: Role
  employee?: Employee
}

export type AccountDoc = {
  uuid: string
  profile: Types.ObjectId
  status: Status
  isComplete: boolean
  role?: Role
  employee?: Types.ObjectId
}

const AccountSchema = new Schema({
  uuid: { type: String, unique: true },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(ACCOUNT_STATUS),
    default: ACCOUNT_STATUS.pending,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLE),
    default: USER_ROLE.employee,
    required: true,
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  },
})

const accountModel = model<AccountDoc>('Account', AccountSchema)
export default accountModel

// account population
// .populate<{ role: Role }>('role')
// .populate<{ profile: Profile }>('profile')
// .populate<{ employee: Employee }>({
//   path: 'employee',
//   populate: [
//     {
//       path: 'company',
//       populate: [{ path: 'departments' }, { path: 'employees' }],
//     },
//     {
//       path: 'department',
//       populate: [{ path: 'company' }, { path: 'employees' }],
//     },
//     { path: 'profile' },
//     { path: 'supervisor' },
//     { path: 'subordinates' },
//   ],
// })
// .populate<{ status: Status }>('status')
// .lean()
// .exec()
