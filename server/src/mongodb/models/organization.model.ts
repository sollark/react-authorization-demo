import { model, Schema } from 'mongoose'
import { Department } from './department.model.js'

export interface Organization {
  organizationName: string
  organizationCode: OrganizationCode
  departments?: Department[]
  workers?: Worker[]
}

export type OrganizationCode = string

const OrganizationSchema = new Schema({
  organizationName: { type: String, required: true },
  organizationCode: { type: String, required: true, unique: true },
})

const OrganizationModel = model<Organization>(
  'Organization',
  OrganizationSchema
)
export default OrganizationModel
