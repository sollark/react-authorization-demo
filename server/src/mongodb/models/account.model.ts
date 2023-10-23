import { Schema, Types, model } from 'mongoose'
import { Profile } from './profile.model.js'
import { Role } from './role.model.js'
import { Workplace } from './workplace.model.js'

export const ACCOUNT_STATUS = {
  unregistered: 'Unregistered',
  pending: 'Pending',
  active: 'Active',
  inactive: 'Inactive',
  deleted: 'Deleted',
} as const
export type Status = keyof typeof ACCOUNT_STATUS

export type Account = {
  identifier?: Types.ObjectId
  profile: Profile
  status: Status
  isComplete: boolean
  role?: Role
  workplace?: Workplace
}

export type AccountRef = {
  identifier?: Types.ObjectId
  profile: Types.ObjectId
  status: Status
  isComplete: boolean
  role?: Types.ObjectId
  workplace?: Types.ObjectId
}

const AccountSchema = new Schema({
  identifier: { type: Types.ObjectId, unique: true },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(ACCOUNT_STATUS),
    default: ACCOUNT_STATUS.unregistered,
    required: true,
    immutable: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
  },
  workplace: {
    type: Schema.Types.ObjectId,
    ref: 'workplace',
  },
})

const accountModel = model<AccountRef>('Account', AccountSchema)
export default accountModel
