import { AsyncLocalStorage } from 'async_hooks'

interface UserData {
  userData?: {
    identifier: string
  }
}

export const asyncLocalStorage = new AsyncLocalStorage<UserData>()
