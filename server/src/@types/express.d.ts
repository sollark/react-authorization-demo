import { Types } from 'mongoose'

export {}

declare module 'express' {
  export interface Request {
    userData?: {
      identifier: Types.ObjectId
    }
  }
}
