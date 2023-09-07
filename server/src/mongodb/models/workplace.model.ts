import { Schema, Types, model } from 'mongoose'
import { Company } from './company.model.js'
import { Department } from './department.model.js'
import { Profile } from './profile.model.js'

export type Workplace = {
  company: Company
  department?: Department
  employeeId: string
  position?: string
  employee: Profile
  supervisor?: Workplace
  subordinates?: Workplace[]
}

export type WorkplaceRef = {
  company: Types.ObjectId
  department?: Types.ObjectId
  employeeId: string
  position?: string
  employee: Types.ObjectId
  supervisor?: Types.ObjectId
  subordinates?: Types.ObjectId[]
}

const WorkplaceSchema = new Schema({
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
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
})

// it cant be inside WorkplaceSchema because it will cause circular dependency, so it has to be defined outside
WorkplaceSchema.add({
  supervisor: WorkplaceSchema,
  subordinates: [WorkplaceSchema],
})

const WorkplaceModel = model<WorkplaceRef>('workplace', WorkplaceSchema)
export default WorkplaceModel
