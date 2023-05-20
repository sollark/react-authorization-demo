import { Document, Schema, Types, model } from 'mongoose'

export interface Account {
  isComplete: boolean
  user: Types.ObjectId
  workspaces: Workspace[]
}

interface AccountDocument extends Document, Account {}

interface Workspace {
  organization: Types.ObjectId
  userRoles: Types.ObjectId[]
}

const WorkspaceSchema = new Schema<Workspace>({
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
  },
  userRoles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'UserRole',
    },
  ],
})

const AccountSchema = new Schema<AccountDocument>({
  isComplete: {
    type: Boolean,
    default: false,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },

  workspaces: {
    type: [WorkspaceSchema],
  },
})

const AccountModel = model<AccountDocument>('Account', AccountSchema)
export default AccountModel
