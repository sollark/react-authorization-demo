import { model, Schema, Types } from 'mongoose'
import { Department } from './department.model.js'
import { Employee } from './employee.model.js'

export type Company = {
  companyName: string
  companyNumber: string
  departments: Department[] | []
  employees: Employee[] | []
}
export type CompanyDoc = {
  companyName: string
  companyNumber: string
  departments: Types.ObjectId[]
  employees: Types.ObjectId[]
}

const CompanySchema = new Schema({
  companyName: { type: String, required: true },
  companyNumber: { type: String, required: true, unique: true },
  departments: [
    { type: Schema.Types.ObjectId, ref: 'Department', default: [] },
  ],
  employees: [{ type: Schema.Types.ObjectId, ref: 'Employee', default: [] }],
})

const CompanyModel = model<CompanyDoc>('Company', CompanySchema)
export default CompanyModel
