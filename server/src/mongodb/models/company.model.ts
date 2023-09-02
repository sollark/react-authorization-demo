import { model, Schema, Types } from 'mongoose'
import { Department } from './department.model.js'
import { Profile } from './profile.model.js'

export type CompanyCode = string
export type Company = {
  companyName: string
  companyCode: CompanyCode
  departments?: Department[]
  employees?: Profile[]
}
export type CompanyRef = {
  companyName: string
  companyCode: CompanyCode
  departments?: Types.ObjectId[]
  employees?: Types.ObjectId[]
}

const CompanySchema = new Schema({
  companyName: { type: String, required: true },
  companyCode: { type: String, required: true, unique: true },
  departments: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
  employees: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
})

const CompanyModel = model<CompanyRef>('Company', CompanySchema)
export default CompanyModel
