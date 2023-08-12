import { Schema, Types, model } from 'mongoose'
import { EncodedWorkspace, Workspace } from './workspace.model.js'
import { User } from './user.model.js'

export interface Account {
  identifier: Types.ObjectId
  user: User
  // workspaces: Types.ObjectId[] | EncodedWorkspace[]
  workspaces: Workspace[] | EncodedWorkspace[]
  isComplete: boolean
}

export interface AccountRef {
  identifier: Types.ObjectId
  user: Types.ObjectId
  workspaces: Types.ObjectId[]
  isComplete: boolean
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
    ref: 'User',
  },
  workspaces: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
    },
  ],
})

const accountModel = model<AccountRef>('Account', AccountSchema)
export default accountModel
