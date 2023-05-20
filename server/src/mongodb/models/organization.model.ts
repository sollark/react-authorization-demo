import { model, Schema } from 'mongoose'

export type OrganizationIdentifier = string

export interface Organization {
  identifier: OrganizationIdentifier
  name: string
}

const OrganizationSchema = new Schema({
  identifier: { type: String, required: true, unique: true },
  name: { type: String, required: true },
})

const OrganizationModel = model<Organization>(
  'Organization',
  OrganizationSchema
)
export default OrganizationModel
