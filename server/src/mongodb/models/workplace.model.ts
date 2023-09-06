import { Schema, Types, model } from 'mongoose'
import { Company } from './company.model.js'
import { Department } from './department.model.js'
import { Profile } from './profile.model.js'

export type Workplace = {
  company: Company
  department?: Department
  employeeNumber?: string
  position?: string
  employee: Profile
  supervisor?: Workplace
  subordinates?: Workplace[]
}

export type WorkplaceRef = {
  company: Types.ObjectId
  department?: Types.ObjectId
  employeeNumber?: string
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
  employeeNumber: { type: String },
  position: { type: String },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  supervisor: {
    type: Schema.Types.ObjectId,
    ref: 'Workplace',
  },
  subordinates: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Workplace',
    },
  ],
})

const WorkplaceModel = model<WorkplaceRef>('workplace', WorkplaceSchema)
export default WorkplaceModel
