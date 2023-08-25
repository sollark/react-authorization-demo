import { Schema, model } from 'mongoose'
import { Workspace } from './workspace.model.js'

export interface Worker {
  firstName: string
  lastName: string
  workspace: Workspace
}

const WorkerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  workspace: { type: Schema.Types.ObjectId, ref: 'Workspace' },
})

const WorkerModel = model<Worker>('Worker', WorkerSchema)
export default WorkerModel
