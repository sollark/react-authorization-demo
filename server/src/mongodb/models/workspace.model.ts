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

export interface WorkspaceSchema {
  organization: Types.ObjectId
  roles: Types.ObjectId[]
}

const WorkspaceSchema = new Schema<Workspace>({
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'RoleMap',
    },
  ],
})

const WorkspaceRefModel = model<Workspace>('Workspace', WorkspaceSchema)
export default WorkspaceRefModel
