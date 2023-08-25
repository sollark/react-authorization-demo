import { Schema, model } from 'mongoose'

export interface Worker {
  firstName: string
  lastName: string
}

const WorkerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
})

const WorkerModel = model<Worker>('Worker', WorkerSchema)
export default WorkerModel
