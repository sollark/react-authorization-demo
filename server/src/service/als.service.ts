import { AsyncLocalStorage } from 'async_hooks'
import logger from './logger.service.js'

export type UserData = {
  uuid: string
  companyNumber?: string
  employeeNumber?: string
}

export class ALSStore {
  private data: UserData | null = null

  setUserData(userData: UserData) {
    this.data = userData
  }

  getUserData(): UserData | null {
    return this.data
  }
}

export const asyncLocalStorage = new AsyncLocalStorage<ALSStore>()

export function setUserData(userData: UserData) {
  console.log(`setting als ${asyncLocalStorage} with data`, userData)
  const store = asyncLocalStorage.getStore()
  if (!store) {
    throw new Error('ALS store not initialized')
  }

  store.setUserData(userData)
}

export function getUuid() {
  const store = asyncLocalStorage.getStore()

  if (!store) {
    throw new Error('ALS store not initialized')
  }

  const uuid = store.getUserData()?.uuid
  if (!uuid) {
    logger.warn('getUuid - cannot get uuid from ALS')

    return
  } else {
    logger.info(`getUuid - uuid: ${uuid}`)
  }

  return uuid
}

export function getCompanyNumberFromALS() {
  const store = asyncLocalStorage.getStore()
  if (!store) {
    throw new Error('ALS store not initialized')
  }

  const companyNumber = store.getUserData()?.companyNumber
  if (!companyNumber) {
    logger.warn(`getCompanyNumberFromALS - cannot get companyNumber from ALS`)

    return
  } else
    logger.info(`getCompanyNumberFromALS - companyNumber: ${companyNumber}`)

  return companyNumber
}

export function getEmployeeNumberFromALS() {
  const store = asyncLocalStorage.getStore()
  if (!store) {
    throw new Error('ALS store not initialized')
  }

  const employeeNumber = store.getUserData()?.employeeNumber
  if (!employeeNumber) {
    logger.warn('getEmployeeNumberFromALS - cannot get employeeNumber from ALS')

    return
  } else
    logger.info(`getEmployeeNumberFromALS - employeeNumber: ${employeeNumber}`)

  return employeeNumber
}
