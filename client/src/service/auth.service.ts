import { AuthCredentials } from '@/models/Auth'
import { isAuthResponse } from '../models/response/AuthResponse'
import { accountService } from './account.service'
import { httpService } from './axios/http.service'
import { log } from './console.service'
import { storeService } from './store.service'

type AuthData = {
  accessToken: string
}

async function registration(email: string, password: string) {
  const registrationResponse = await httpService.post<
    AuthCredentials,
    AuthData
  >('auth/registration', { email, password })

  if (!registrationResponse)
    return { success: false, message: 'Cannot connect to server' }

  const { success, message } = registrationResponse
  if (success) {
    const { data } = registrationResponse
    log('registration, message: ', message)

    const { accessToken } = data
    storeService.saveAccessToken(accessToken)
    storeService.setProfileAsAuthenticated()
  }

  // TODO clear comments
  // lets make registration with account creation

  return { success, message }
}

async function signIn(email: string, password: string) {
  const signInResponse = await httpService.post<AuthCredentials, AuthData>(
    'auth/signin',
    { email, password }
  )

  if (!signInResponse)
    return { success: false, message: 'Cannot connect to server' }

  const { success, message } = signInResponse

  if (success) {
    const { data } = signInResponse
    log('signIn, message: ', message)

    const { accessToken } = data
    storeService.saveAccessToken(accessToken)
    storeService.setProfileAsAuthenticated()
  }

  return { success, message }
}

async function signOut() {
  log('signOut')

  await httpService.put('auth/signout', null)

  storeService.clearStoreStates()
}

async function refreshTokens() {
  log('refreshTokens')

  const refreshResponse = await httpService.get<null, AuthData>(
    `auth/refresh`,
    null
  )

  log('refreshTokens, response data', refreshResponse)

  if (!isAuthResponse(refreshResponse)) return null

  const { accessToken } = refreshResponse
  if (accessToken) {
    storeService.saveAccessToken(accessToken)
    storeService.setProfileAsAuthenticated()
  }

  const account = await accountService.getAccount()
  if (account) storeService.saveAccount(account)
}

export const authService = {
  signIn,
  signOut,
  registration,
  refreshTokens,
}
