import { Account } from '@/models/Account'
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

  const response = await httpService.get<null, AuthResponse | undefined>(
    'auth/access',
    null
  )

  if (isAuthResponse(response)) {
    const { account, accessToken } = response as any

    storeService.saveAccessToken(accessToken)
    storeService.setUserAsAuthorized()
    storeService.saveAccount(account)
  }
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
    useAuthStore.getState().setToken(accessToken)
    storeService.setUserAsAuthorized()
  }

  const account = await accountService.getAccount()
  if (account) storeService.saveAccount(account)

  return account ? account : null
}

async function signIn(
  email: string,
  password: string
): Promise<Account | undefined> {
  const signInResponse = await httpService.post<AuthCredentials, AuthResponse>(
    'auth/signin',
    { email, password }
  )

  // console.log('signIn, response data: ', signInResponse)

  if (isAuthResponse(signInResponse)) {
    const { account, accessToken } = signInResponse as any

    useAuthStore.getState().setToken(accessToken)
    storeService.saveAccount(account)

    return account
  }
}

async function signOut() {
  console.log('signOut')

  await httpService.put('auth/signout', null)

  storeService.clearStoreStates()
}

async function refreshTokens() {
  console.log('refreshTokens')

  const response = await httpService.get<null, AuthResponse>(
    `auth/refresh`,
    null
  )

  // console.log('refreshTokens, response data', response)

  if (isAuthResponse(response)) {
    const { account, accessToken } = response as any

    storeService.saveAccessToken(accessToken)
    storeService.setUserAsAuthorized()
    storeService.saveAccount(account)
  }
}

export const authService = {
  getAccess,
  signIn,
  signOut,
  registration,
  refreshTokens,
}
