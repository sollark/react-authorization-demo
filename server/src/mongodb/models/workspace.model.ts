import { Schema, Types, model } from 'mongoose'
import { Company } from './company.model.js'
import { Department } from './department.model.js'
import { Profile } from './profile.model.js'

export type Workspace = {
  company: Company
  department?: Department
  position?: string
  employee: Profile
  supervisor?: Profile
  subordinates?: Profile[]
}

export type WorkspaceRef = {
  company: Types.ObjectId
  department?: Types.ObjectId
  position?: string
  employee: Types.ObjectId
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
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
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

const WorkspaceModel = model<WorkspaceRef>('Workspace', WorkspaceSchema)
export default WorkspaceModel
