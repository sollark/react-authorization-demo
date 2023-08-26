import { Schema, Types, model } from 'mongoose'
import { Company } from './company.model.js'
import { Department } from './department.model.js'
import { Role } from './role.model.js'
import { RoleCode } from './roleCode.model.js'

export interface Workspace {
  company: Company
  department: Department
  roles: Role[]
}

export interface EncodedWorkspace {
  company: Company
  department: Department
  roles: RoleCode[]
}

export interface WorkspaceRef {
  identifier: Types.ObjectId
  company: Types.ObjectId
  department: Types.ObjectId
  roles: Types.ObjectId[]
}

const WorkspaceSchema = new Schema({
  identifier: { type: Types.ObjectId, required: true },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Roles',
    },
  ],
})

const WorkspaceRefModel = model<WorkspaceRef>('Workspace', WorkspaceSchema)
export default WorkspaceRefModel
