import { AsyncLocalStorage } from 'async_hooks'
import UnauthorizedError from '../errors/UnauthorizedError.js'
import loggerService from './logger.service.js'

type UserData = {
  userData?: {
    uuid: string
  }
}

export const asyncLocalStorage = new AsyncLocalStorage<UserData>()

export function getUuidFromALS() {
  const store = asyncLocalStorage.getStore()
  const uuid = store?.userData?.uuid

  if (!uuid) {
    loggerService.warn(`getIdentifierFromALS - cannot get uuid from ALS`)

    throw new UnauthorizedError('You are not unauthorized')
  } else loggerService.info(`getIdentifierFromALS - uuid: ${uuid}`)

  return uuid
}
