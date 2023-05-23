import { model, Schema } from 'mongoose'

export type OrganizationIdentifier = number

export interface Organization {
  identifier: OrganizationIdentifier
  name: string
}

const OrganizationSchema = new Schema({
  identifier: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
})

const OrganizationModel = model<Organization>(
  'Organization',
  OrganizationSchema
)
export default OrganizationModel
