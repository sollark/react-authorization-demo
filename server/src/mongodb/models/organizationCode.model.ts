import { model, Schema } from 'mongoose'

export type OrganizationCode = string

export interface OrganizationCodeMap {
  organizationName: string
  organizationCode: OrganizationCode
}

const OrganizationCodeMapSchema = new Schema({
  organizationName: { type: String, required: true },
  organizationCode: { type: String, required: true, unique: true },
})

const OrganizationCodeModel = model(
  'OrganizationCode',
  OrganizationCodeMapSchema
)
export default OrganizationCodeModel
