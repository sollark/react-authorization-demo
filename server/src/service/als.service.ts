import { AsyncLocalStorage } from 'async_hooks'
import { Types } from 'mongoose'
import UnauthorizedError from '../errors/UnauthorizedError.js'
import loggerService from './logger.service.js'

type UserData = {
  userData?: {
    identifier: Types.ObjectId
  }
}

export const asyncLocalStorage = new AsyncLocalStorage<UserData>()

export function getIdentifierFromALS() {
  const store = asyncLocalStorage.getStore()
  const identifier = store?.userData?.identifier

  if (!identifier) {
    loggerService.warn(`getIdentifierFromALS- cannot get identifier from ALS`)

    throw new UnauthorizedError('You are not unauthorized')
  } else loggerService.info(`getIdentifierFromALS- identifier: ${identifier}`)

  return identifier
}
