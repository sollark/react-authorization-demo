import { Schema, Types, model } from 'mongoose'
import { Employee } from './employee.model.js'

export type Department = {
  departmentName: string
  employees?: Employee[]
}

export type DepartmentRef = {
  departmentName: string
  employees?: Types.ObjectId[]
}

const DepartmentSchema = new Schema({
  departmentName: { type: String, required: true },
  employees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
})

const DepartmentModel = model<DepartmentRef>('Department', DepartmentSchema)
export default DepartmentModel
