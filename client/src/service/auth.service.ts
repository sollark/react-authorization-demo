import { AuthCredentials } from '@/models/Auth'
import useAuthStore from '@/stores/authStore'
import { AuthResponse, isAuthResponse } from '../models/response/AuthResponse'
import { accountService } from './account.service'
import { httpService } from './axios/http.service'
import { storeService } from './store.service'

// renew tokens when access token is gone on page reload
async function getAccess() {
  const currentAccessToken = useAuthStore.getState().token
  if (currentAccessToken) return

  const getAccessResponse = await httpService.get<
    null,
    AuthResponse | undefined
  >('auth/access', null)

  if (!isAuthResponse(getAccessResponse)) return

  const { accessToken } = getAccessResponse as any
  storeService.saveAccessToken(accessToken)
  storeService.setUserAsAuthenticated()
}

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
    storeService.setUserAsAuthenticated()
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
    storeService.setUserAsAuthenticated()
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

  // console.log('refreshTokens, response data', response)

  if (!isAuthResponse(refreshResponse)) return null

  const { accessToken } = refreshResponse as any
  if (accessToken) {
    storeService.saveAccessToken(accessToken)
    storeService.setUserAsAuthenticated()
  }

  const account = await accountService.getAccount()
  if (account) storeService.saveAccount(account)
}

export const authService = {
  getAccess,
  signIn,
  signOut,
  registration,
  refreshTokens,
}
