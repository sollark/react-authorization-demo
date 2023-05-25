import { model, Schema } from 'mongoose'
import { OrganizationCode } from './organizationCode.model.js'

export interface Organization {
  name: string
  code: OrganizationCode
}

const OrganizationSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
})

const OrganizationModel = model<Organization>(
  'Organization',
  OrganizationSchema
)
export default OrganizationModel
