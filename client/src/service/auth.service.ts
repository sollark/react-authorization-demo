import { Account } from '@/models/Account'
import { AuthCredentials } from '@/models/Auth'
import { AuthResponse } from '../models/response/AuthResponse'
import { httpService } from './axios/http.service'
import { storeService } from './store.service'

async function registration(email: string, password: string) {
  const response = await httpService.post<AuthCredentials, AuthResponse>(
    'auth/registration',
    { email, password }
  )

  console.log('registration response data', response)

  const { account, refreshToken, accessToken } = response as any

  localStorage.setItem('accessToken', accessToken)

  storeService.saveToStore(account)

  return account ? account : null
}

async function signIn(
  email: string,
  password: string
): Promise<Account | undefined> {
  try {
    const response = await httpService.post<AuthCredentials, AuthResponse>(
      'auth/signin',
      { email, password }
    )

    console.log('signIn response data', response)

    const { account, refreshToken, accessToken } = response as any

    localStorage.setItem('accessToken', accessToken)

    storeService.saveToStore(account)

    return account
  } catch (error) {
    throw error
  }
}

async function signOut() {
  console.log('signOut')

  await httpService.put('auth/signout', null)

  storeService.clearStoreStates()
  localStorage.removeItem('accessToken')
}

async function refreshTokens() {
  const response = await httpService.get<null, AuthResponse>(
    `auth/refresh`,
    null
  )

  console.log('refresh response data', response)

  const { account, refreshToken, accessToken } = response as any

  localStorage.setItem('accessToken', accessToken)

  storeService.saveToStore(account)
}

export const authService = { signIn, signOut, registration, refreshTokens }
