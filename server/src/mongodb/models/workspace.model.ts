import { Schema, Types, model } from 'mongoose'
import { Company } from './company.model.js'
import { Department } from './department.model.js'
import { Employee } from './employee.model.js'
import { Role } from './role.model.js'
import { RoleCode } from './roleCode.model.js'

export interface Workspace {
  company: Company
  department: Department
  position: string
  supervisor?: Employee
  subordinates?: Employee[]
  roles: Role[]
}

export interface EncodedWorkspace {
  company: Company
  department: Department
  position: string
  roles: RoleCode[]
}

export interface WorkspaceRef {
  company: Types.ObjectId
  department: Types.ObjectId
  position: string
  roles: Types.ObjectId[]
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
  jobPosition: { type: String, required: true },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Roles',
    },
  ],
})

const WorkspaceRefModel = model<WorkspaceRef>('Workspace', WorkspaceSchema)
export default WorkspaceRefModel
