import { model, Schema } from 'mongoose'

export type OrganizationCode = number

export interface OrganizationMap {
  name: string
  code: OrganizationCode
}

const OrganizationCodeSchema = new Schema({
  name: { type: String, required: true, unique: true },
  code: { type: Number, required: true, unique: true },
})

const OrganizationCodeModel = model('OrganizationCode', OrganizationCodeSchema)
export default OrganizationCodeModel
