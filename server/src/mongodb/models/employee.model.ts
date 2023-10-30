import { Schema, Types, model } from 'mongoose'
import { Company } from './company.model.js'
import { Department } from './department.model.js'
import { Profile } from './profile.model.js'

export type Employee = {
  company: Company
  department?: Department
  employeeId: string
  position?: string
  profile: Profile
  supervisor?: Employee
  subordinates?: Employee[]
}

export type EmployeeRef = {
  company: Types.ObjectId
  department?: Types.ObjectId
  employeeId: string
  position?: string
  profile: Types.ObjectId
  supervisor?: Types.ObjectId
  subordinates?: Types.ObjectId[]
}

const EmployeeSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
  },
  employeeId: { type: String },
  position: { type: String },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
})

// it cant be inside EmployeeSchema because it will cause circular dependency, so it has to be defined outside
EmployeeSchema.add({
  supervisor: EmployeeSchema,
  subordinates: [EmployeeSchema],
})

const EmployeeModel = model<EmployeeRef>('employee', EmployeeSchema)
export default EmployeeModel
