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

export interface WorkspaceSchema {
  organization: Types.ObjectId
  userRoles: Types.ObjectId[]
}

const WorkspaceSchema = new Schema<Workspace>({
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'UserRole',
    },
  ],
})

const WorkspaceRefModel = model<Workspace>('Workspace', WorkspaceSchema)
export default WorkspaceRefModel
