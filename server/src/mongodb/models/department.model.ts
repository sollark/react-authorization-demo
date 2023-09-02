import { Schema, Types, model } from 'mongoose'
import { Profile } from './profile.model.js'

export type Department = {
  departmentName: string
  employees?: Profile[]
}

export type DepartmentRef = {
  departmentName: string
  employees?: Types.ObjectId[]
}

const DepartmentSchema = new Schema({
  departmentName: { type: String, required: true },
  employees: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
})

const DepartmentModel = model<DepartmentRef>('Department', DepartmentSchema)
export default DepartmentModel
