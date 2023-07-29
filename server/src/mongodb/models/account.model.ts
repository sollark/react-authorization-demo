import { Schema, Types, model } from 'mongoose'
import { EncodedWorkspace } from './workspace.model.js'

export interface Account {
  identifier: Types.ObjectId
  user: Types.ObjectId
  workspaces: Types.ObjectId[] | EncodedWorkspace[]
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

const accountModel = model<Account>('Account', AccountSchema)
export default accountModel
