import { model, Schema, Types } from 'mongoose'
import { Department } from './department.model.js'
import { Employee } from './employee.model.js'

export type Company = {
  companyName: string
  companyNumber: string
  departments?: Department[]
  employees?: Employee[]
}
export type CompanyRef = {
  companyName: string
  companyNumber: string
  departments?: Types.ObjectId[]
  employees?: Types.ObjectId[]
}

const CompanySchema = new Schema({
  companyName: { type: String, required: true },
  companyNumber: { type: String, required: true, unique: true },
  departments: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
  employees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
})

const CompanyModel = model<CompanyRef>('Company', CompanySchema)
export default CompanyModel
