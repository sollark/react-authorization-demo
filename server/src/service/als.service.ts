import { AsyncLocalStorage } from 'async_hooks'

interface UserData {
  userData?: {
    email: string
  }
}

export const asyncLocalStorage = new AsyncLocalStorage<UserData>()
