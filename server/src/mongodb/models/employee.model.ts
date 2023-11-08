import { Schema, Types, model } from 'mongoose'
import { Company } from './company.model.js'
import { Department } from './department.model.js'
import { Profile } from './profile.model.js'

export const EMPLOYEE_STATUS = {
  unregistered: 'Unregistered',
  registered: 'Registered',
} as const
export type EmployeeStatus = keyof typeof EMPLOYEE_STATUS

export type Employee = {
  company: Company
  department?: Department
  employeeNumber: string
  position?: string
  profile: Profile
  supervisor?: Employee
  subordinates?: Employee[]
  employeeStatus: EmployeeStatus
}

export type EmployeeRef = {
  company: Types.ObjectId
  department?: Types.ObjectId
  employeeNumber: string
  position?: string
  profile: Types.ObjectId
  supervisor?: Types.ObjectId
  subordinates?: Types.ObjectId[]
  employeeStatus: EmployeeStatus
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
  employeeNumber: { type: String },
  position: { type: String },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  employeeStatus: {
    type: String,
    enum: Object.values(EMPLOYEE_STATUS),
    default: EMPLOYEE_STATUS.unregistered,
    required: true,
    immutable: true,
  },
})

// it cant be inside EmployeeSchema because it will cause circular dependency, so it has to be defined outside
EmployeeSchema.add({
  supervisor: EmployeeSchema,
  subordinates: [EmployeeSchema],
})

const EmployeeModel = model<EmployeeRef>('Employee', EmployeeSchema)
export default EmployeeModel
