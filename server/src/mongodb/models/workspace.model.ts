import { Schema, Types, model } from 'mongoose'
import { Company } from './company.model.js'
import { Department } from './department.model.js'
import { Employee } from './employee.model.js'

export type Workspace = {
  company: Company
  department: Department
  position: string
  supervisor?: Employee
  subordinates?: Employee[]
}

export type WorkspaceRef = {
  company: Types.ObjectId
  department: Types.ObjectId
  position: string
  supervisor?: Types.ObjectId
  subordinates?: Types.ObjectId[]
}

const WorkspaceSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
  },
  position: { type: String, required: true },
  supervisor: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  },
  subordinates: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
  ],
})

const WorkspaceRefModel = model<WorkspaceRef>('Workspace', WorkspaceSchema)
export default WorkspaceRefModel
