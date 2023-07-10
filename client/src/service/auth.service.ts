import { Account } from '@/models/Account'
import { AuthCredentials } from '@/models/Auth'
import useAuthStore from '@/stores/authStore'
import { AuthResponse } from '../models/response/AuthResponse'
import { httpService } from './axios/http.service'
import { storeService } from './store.service'

async function getAccess() {
  const currentAccessToken = useAuthStore.getState().token
  if (currentAccessToken) return

  const response = await httpService.get<null, AuthResponse | undefined>(
    'auth/access',
    null
  )

  const { account, accessToken } = response as any

  useAuthStore.getState().setToken(accessToken)
  storeService.saveToStore(account)
}

async function registration(email: string, password: string) {
  const response = await httpService.post<AuthCredentials, AuthResponse>(
    'auth/registration',
    { email, password }
  )

  console.log('registration response data', response)

  const { account, accessToken } = response as any

  useAuthStore.getState().setToken(accessToken)
  storeService.saveToStore(account)

  return account
}

async function signIn(
  email: string,
  password: string
): Promise<Account | undefined> {
  const response = await httpService.post<AuthCredentials, AuthResponse>(
    'auth/signin',
    { email, password }
  )

  // console.log('signIn response data', response)

  const { account, accessToken } = response as any

  useAuthStore.getState().setToken(accessToken)
  storeService.saveToStore(account)

  return account
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

  // console.log('refreshTokens response data', response)

  const { account, accessToken } = response as any

  useAuthStore.getState().setToken(accessToken)
  storeService.saveToStore(account)
}

export const authService = {
  getAccess,
  signIn,
  signOut,
  registration,
  refreshTokens,
}
