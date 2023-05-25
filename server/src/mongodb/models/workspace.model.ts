import { Schema, Types, model } from 'mongoose'
import { Organization } from './organization.model.js'
import { OrganizationCode } from './organizationCode.model.js'
import { RoleCode, UserRole } from './roleCode.model.js'

export interface Workspace {
  organization: Organization
  roles: UserRole[]
}

export interface WorkspaceCode {
  organization: OrganizationCode
  roles: RoleCode[]
}

export interface WorkspaceRef {
  organization: Types.ObjectId
  userRoles: Types.ObjectId[]
}

const WorkspaceRefSchema = new Schema<WorkspaceRef>({
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

const workspaceRefModel = model<WorkspaceRef>('Workspace', WorkspaceRefSchema)
export default workspaceRefModel
