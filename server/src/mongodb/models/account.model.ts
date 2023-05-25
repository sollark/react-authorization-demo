import { Document, Schema, Types, model } from 'mongoose'

export interface Account {
  identifier: Types.ObjectId
  user: Types.ObjectId
  workspaces?: Types.ObjectId[]
  isComplete: boolean
}

interface AccountDocument extends Document, Account {}

const AccountSchema = new Schema<AccountDocument>({
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

const accountModel = model<AccountDocument>('Account', AccountSchema)
export default accountModel
