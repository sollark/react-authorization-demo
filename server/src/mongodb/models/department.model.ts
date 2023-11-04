import { Schema, Types, model } from 'mongoose'
import { Employee } from './employee.model.js'

export type Department = {
  departmentName: string
  company: Types.ObjectId
  employees?: Employee[]
}

export type DepartmentRef = {
  departmentName: string
  company: Types.ObjectId
  employees?: Types.ObjectId[]
}

const DepartmentSchema = new Schema({
  departmentName: { type: String, required: true },
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  employees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
})

const DepartmentModel = model<DepartmentRef>('Department', DepartmentSchema)
export default DepartmentModel
