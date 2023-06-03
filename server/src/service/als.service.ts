import { AsyncLocalStorage } from 'async_hooks'
import { Types } from 'mongoose'

interface UserData {
  userData?: {
    identifier: Types.ObjectId
  }
}

export const asyncLocalStorage = new AsyncLocalStorage<UserData>()
