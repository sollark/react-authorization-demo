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
type Status = keyof typeof ACCOUNT_STATUS

export type Account = {
  identifier: Types.ObjectId
  user: Profile
  role: Role
  workspaces: Workspace[]
  isComplete: boolean
  status: Status
}

export type AccountRef = {
  identifier: Types.ObjectId
  user: Types.ObjectId
  role: Types.ObjectId
  workspaces: Types.ObjectId[]
  isComplete: boolean
  status: Status
}

const AccountSchema = new Schema({
  identifier: { type: Types.ObjectId, required: true, unique: true },
  isComplete: {
    type: Boolean,
    default: false,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
  },
  workspaces: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
    },
  ],
  status: {
    type: String,
    enum: Object.values(ACCOUNT_STATUS),
    default: ACCOUNT_STATUS.pending,
    required: true,
  },
})

const accountModel = model<AccountRef>('Account', AccountSchema)
export default accountModel
