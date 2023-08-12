import { Schema, Types, model } from 'mongoose'
import { Organization } from './organization.model.js'
import { Role } from './role.model.js'
import { RoleCode } from './roleCode.model.js'

export interface Workspace {
  organization: Organization
  roles: Role[]
}

export interface EncodedWorkspace {
  organization: Organization
  roles: RoleCode[]
}

export interface WorkspaceRef {
  identifier: Types.ObjectId
  organization: Types.ObjectId
  roles: Role[]
}

const WorkspaceSchema = new Schema({
  identifier: { type: Types.ObjectId, required: true },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
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
