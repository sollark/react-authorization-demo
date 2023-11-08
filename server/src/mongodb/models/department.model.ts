import { Schema, Types, model } from 'mongoose'
import { Employee } from './employee.model.js'

export type Department = {
  departmentName: string
  company: Types.ObjectId
  employees?: Employee[]
}

export type DepartmentDoc = {
  departmentName: string
  company: Types.ObjectId
  employees?: Types.ObjectId[]
}

const DepartmentSchema = new Schema({
  departmentName: { type: String, required: true },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    select: false,
    required: true,
  },
  employees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
})

const DepartmentModel = model<DepartmentDoc>('Department', DepartmentSchema)
export default DepartmentModel
