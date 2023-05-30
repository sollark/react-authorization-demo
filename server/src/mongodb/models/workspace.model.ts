import { Schema, Types, model } from 'mongoose'
import { Organization } from './organization.model.js'
import { OrganizationCode } from './organizationCode.model.js'
import { RoleCode, Role } from './role.model.js'

export interface Workspace {
  organization: Organization
  roles: Role[]
}

export interface WorkspaceCode {
  organization: OrganizationCode
  roles: RoleCode[]
}

interface WorkspaceRef {
  organization: Types.ObjectId
  roles: Role[]
}

const WorkspaceSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
  },
  roles: [{ type: String }],
})

const WorkspaceRefModel = model<WorkspaceRef>('Workspace', WorkspaceSchema)
export default WorkspaceRefModel
