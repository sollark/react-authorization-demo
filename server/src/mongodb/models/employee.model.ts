import { Schema, Types, model } from 'mongoose'
import { Profile } from './profile.model.js'
import { Workspace } from './workspace.model.js'

export type Employee = {
  profile: Profile
  workspace: Workspace
}

export type EmployeeRef = {
  profile: Types.ObjectId
  workspace: Types.ObjectId
}

const EmployeeSchema = new Schema({
  profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
  workspace: { type: Schema.Types.ObjectId, ref: 'Workspace' },
})

const EmployeeModel = model<EmployeeRef>('Employee', EmployeeSchema)
export default EmployeeModel
