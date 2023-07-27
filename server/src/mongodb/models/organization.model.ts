import { model, Schema } from 'mongoose'

export interface Organization {
  organizationName: string
  organizationCode: OrganizationCode
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
