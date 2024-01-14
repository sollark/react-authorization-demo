import { AsyncLocalStorage } from 'async_hooks'
import UnauthorizedError from '../errors/UnauthorizedError.js'
import loggerService from './logger.service.js'

export type SessionData = {
  userData?: {
    uuid: string
    companyNumber?: string
    employeeNumber?: string
  }
}

export const asyncLocalStorage = new AsyncLocalStorage<SessionData>()

export function setUuidToALS(uuid: string) {
  const store = asyncLocalStorage.getStore()
  if (!store) return

  store.userData = { uuid }
}

export function getUuidFromALS() {
  const store = asyncLocalStorage.getStore()
  const uuid = store?.userData?.uuid

  if (!uuid) {
    loggerService.warn(`getIdentifierFromALS - cannot get uuid from ALS`)

    throw new UnauthorizedError('You are not unauthorized')
  } else loggerService.info(`getIdentifierFromALS - uuid: ${uuid}`)

  return uuid
}

export function getCompanyNumberFromALS() {
  const store = asyncLocalStorage.getStore()
  const companyNumber = store?.userData?.companyNumber

  if (!companyNumber) {
    loggerService.warn(
      `getCompanyNumberFromALS - cannot get companyNumber from ALS`
    )
  } else
    loggerService.info(
      `getCompanyNumberFromALS - companyNumber: ${companyNumber}`
    )

  return companyNumber
}

export function getEmployeeNumberFromALS() {
  const store = asyncLocalStorage.getStore()
  const employeeNumber = store?.userData?.employeeNumber

  if (!employeeNumber) {
    loggerService.warn(
      `getEmployeeNumberFromALS - cannot get employeeNumber from ALS`
    )
  } else
    loggerService.info(
      `getEmployeeNumberFromALS - employeeNumber: ${employeeNumber}`
    )

  return employeeNumber
}
