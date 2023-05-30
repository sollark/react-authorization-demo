import { Schema, Types, model } from 'mongoose'
import { Organization } from './organization.model.js'
import { Role } from './role.model.js'

export interface Workspace {
  organization: Organization
  roles: Role[]
}

interface WorkspaceRef {
  organizationRef: Types.ObjectId
  roles: Role[]
}

const WorkspaceSchema = new Schema({
  organizationRef: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
  },
  roles: [{ type: String }],
})

const WorkspaceRefModel = model<WorkspaceRef>('Workspace', WorkspaceSchema)
export default WorkspaceRefModel
