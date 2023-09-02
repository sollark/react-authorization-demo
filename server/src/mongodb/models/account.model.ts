import { Schema, Types, model } from 'mongoose'
import { Profile } from './profile.model.js'
import { Role } from './role.model.js'
import { Workspace } from './workspace.model.js'

export const ACCOUNT_STATUS = {
  pending: 'pending',
  active: 'active',
  inactive: 'inactive',
  deleted: 'deleted',
} as const
export type Status = keyof typeof ACCOUNT_STATUS

export type Account = {
  identifier: Types.ObjectId
  role?: Role
  profile: Profile
  workspace?: Workspace
  isComplete: boolean
  status: Status
}

export type AccountRef = {
  identifier: Types.ObjectId
  role?: Types.ObjectId
  profile: Types.ObjectId
  workspace?: Types.ObjectId
  isComplete: boolean
  status: Status
}

const AccountSchema = new Schema({
  identifier: { type: Types.ObjectId, required: true, unique: true },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  workspace: {
    type: Schema.Types.ObjectId,
    ref: 'Workspace',
  },
  isComplete: {
    type: Boolean,
    default: false,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(ACCOUNT_STATUS),
    default: ACCOUNT_STATUS.pending,
    required: true,
    immutable: true,
  },
})

const accountModel = model<AccountRef>('Account', AccountSchema)
export default accountModel
