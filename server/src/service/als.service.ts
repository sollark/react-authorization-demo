import { AsyncLocalStorage } from 'async_hooks'

interface IAsyncLocalStorage {
  userData?: {
    email: string
  }
}

export const asyncLocalStorage = new AsyncLocalStorage<IAsyncLocalStorage>()
