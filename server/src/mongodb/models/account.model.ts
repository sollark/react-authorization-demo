import { Schema, Types, model } from 'mongoose'
import { User } from './user.model.js'
import { EncodedWorkspace, Workspace } from './workspace.model.js'

const statusList = ['pending', 'active', 'inactive', 'deleted'] as const
type Status = ArrayElement<typeof statusList>

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export interface Account {
  identifier: Types.ObjectId
  user: User
  workspaces: Workspace[] | EncodedWorkspace[]
  isComplete: boolean
  status: Status
}

export interface AccountRef {
  identifier: Types.ObjectId
  user: Types.ObjectId
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
    ref: 'User',
  },
  workspaces: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
    },
  ],
  status: {
    type: String,
    enum: statusList,
    default: 'pending',
    required: true,
  },
})

const accountModel = model<AccountRef>('Account', AccountSchema)
export default accountModel
