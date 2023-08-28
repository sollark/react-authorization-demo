import { Schema, model } from 'mongoose'

export type Department = {
  departmentName: string
}

const DepartmentSchema = new Schema({
  departmentName: { type: String, required: true },
})

const DepartmentModel = model<Department>('Department', DepartmentSchema)
export default DepartmentModel
