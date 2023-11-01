import { model, Schema, Types } from 'mongoose'
import { Department } from './department.model.js'
import { Employee } from './employee.model.js'

export type CompanyId = string
export type Company = {
  companyName: string
  companyId: CompanyId
  departments?: Department[]
  employees?: Employee[]
}
export type CompanyRef = {
  companyName: string
  companyId: CompanyId
  departments?: Types.ObjectId[]
  employees?: Types.ObjectId[]
}

const CompanySchema = new Schema({
  companyName: { type: String, required: true },
  companyId: { type: String, required: true, unique: true },
  departments: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
  employees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
})

const CompanyModel = model<CompanyRef>('Company', CompanySchema)
export default CompanyModel
