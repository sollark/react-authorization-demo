import { Schema, Types, model } from 'mongoose'
import { Company } from './company.model.js'
import { Department } from './department.model.js'
import { Profile } from './profile.model.js'

export type Workspace = {
  company: Company
  department?: Department
  position?: string
  supervisor?: Profile
  subordinates?: Profile[]
}

export type WorkspaceRef = {
  company: Types.ObjectId
  department?: Types.ObjectId
  position?: string
  supervisor?: Types.ObjectId
  subordinates?: Types.ObjectId[]
}

const WorkspaceSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
  },
  position: { type: String },
  supervisor: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  },
  subordinates: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
    },
  ],
})

const WorkspaceRefModel = model<WorkspaceRef>('Workspace', WorkspaceSchema)
export default WorkspaceRefModel
