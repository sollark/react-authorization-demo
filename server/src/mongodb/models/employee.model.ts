import { Schema, model } from 'mongoose'
import { Profile } from './profile.model.js'
import { Workspace } from './workspace.model.js'

export interface Employee {
  profile: Profile
  workspace: Workspace
}

const EmployeeSchema = new Schema({
  profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
  workspace: { type: Schema.Types.ObjectId, ref: 'Workspace' },
})

const EmployeeModel = model<Employee>('Employee', EmployeeSchema)
export default EmployeeModel
