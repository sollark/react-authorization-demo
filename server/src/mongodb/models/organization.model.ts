import { model, Schema } from 'mongoose'
import { OrganizationCode } from './organizationCode.model.js'

export interface Organization {
  organizationName: string
  organizationCode: OrganizationCode
}

const OrganizationSchema = new Schema({
  organizationName: { type: String, required: true },
  organizationCode: { type: String, required: true, unique: true },
})

const OrganizationModel = model<Organization>(
  'Organization',
  OrganizationSchema
)
export default OrganizationModel
