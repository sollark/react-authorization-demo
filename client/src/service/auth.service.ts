import { Account } from '@/models/Account'
import { AuthCredentials } from '@/models/Auth'
import { AuthResponse } from '../models/response/AuthResponse'
import useUserStore from '../stores/userStore'
import { httpService } from './axios/http.service'

async function signIn(email: string, password: string): Promise<Account> {
  const response = await httpService.post<AuthCredentials, Account>(
    'auth/signin',
    { email, password }
  )

  console.log('response data', response)

  // get the user and the tokens from the response
  const { account, refreshToken, accessToken } = response as any

  console.log('account', account)
  console.log('refreshToken', refreshToken)
  console.log('accessToken', accessToken)

  // save the tokens to the session storage
  sessionStorage.setItem('token', accessToken)

  // set the user store
  useUserStore.setState((state) => state.setUser(account.user))

  return account ? account : null
}

async function signOut() {
  await httpService.put('auth/signout', null)

  useUserStore.setState((state) => state.setUser(null))
}

async function registration(email: string, password: string) {
  const response = await httpService.post<AuthCredentials, AuthResponse>(
    'auth/registration',
    { email, password }
  )

  console.log('registration response', response)
}

export const authService = { signIn, signOut, registration }
