import { model, Schema } from 'mongoose'
import { Department } from './department.model.js'
import { Employee } from './employee.model.js'

export interface Company {
  companyName: string
  companyCode: CompanyCode
  departments?: Department[]
  employees?: Employee[]
}

export type CompanyCode = string

const CompanySchema = new Schema({
  companyName: { type: String, required: true },
  companyCode: { type: String, required: true, unique: true },
})

const CompanyModel = model<Company>('Company', CompanySchema)
export default CompanyModel
