import { AuthCredentials } from '@/models/Auth'
import { AuthResponse, isAuthResponse } from '../models/response/AuthResponse'
import { accountService } from './account.service'
import { httpService } from './axios/http.service'
import { storeService } from './store.service'

async function registration(email: string, password: string) {
  const registrationResponse = await httpService.post<
    AuthCredentials,
    AuthResponse
  >('auth/registration', { email, password })
  console.log('registration, registrationResponse: ', registrationResponse)

  if (!isAuthResponse(registrationResponse)) return null

  const { accessToken } = registrationResponse as any
  if (accessToken) {
    storeService.saveAccessToken(accessToken)
    storeService.setProfileAsAuthenticated()
  }

  const account = await accountService.getAccount()
  if (account) storeService.saveAccount(account)

  return account ? account : null
}

async function signIn(email: string, password: string) {
  const signInResponse = await httpService.post<AuthCredentials, AuthResponse>(
    'auth/signin',
    { email, password }
  )

  // console.log('signIn, response data: ', signInResponse)

  if (!isAuthResponse(signInResponse)) return null

  const { accessToken } = signInResponse as any

  if (accessToken) {
    storeService.saveAccessToken(accessToken)
    storeService.setProfileAsAuthenticated()
  }

  const account = await accountService.getAccount()
  if (account) storeService.saveAccount(account)

  return account ? account : null
}

async function signOut() {
  console.log('signOut')

  await httpService.put('auth/signout', null)

  storeService.clearStoreStates()
}

async function refreshTokens() {
  console.log('refreshTokens')

  const refreshResponse = await httpService.get<null, AuthResponse>(
    `auth/refresh`,
    null
  )

  console.log('refreshTokens, response data', refreshResponse)

  if (!isAuthResponse(refreshResponse)) return null

  const { accessToken } = refreshResponse as any
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
