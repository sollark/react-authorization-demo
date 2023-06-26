import { Account } from '@/models/Account'
import { AuthCredentials } from '@/models/Auth'
import useAccountStore from '@/stores/accountStore'
import { AuthResponse } from '../models/response/AuthResponse'
import useUserStore from '../stores/userStore'
import { httpService } from './axios/http.service'
import { storeService } from './store.service'

async function registration(email: string, password: string) {
  const response = await httpService.post<AuthCredentials, AuthResponse>(
    'auth/registration',
    { email, password }
  )

  const { account, refreshToken, accessToken } = response as any

  localStorage.setItem('accessToken', accessToken)

  // set the user store
  useUserStore.getState().setUser(account.user)

  //set the account store
  useAccountStore.getState().setIsComplete(account.isComplete)

  return account ? account : null
}

async function signIn(email: string, password: string): Promise<Account> {
  const response = await httpService.post<AuthCredentials, Account>(
    'auth/signin',
    { email, password }
  )

  console.log('response data', response)

  const { account, refreshToken, accessToken } = response as any

  console.log('account', account)
  console.log('refreshToken', refreshToken)
  console.log('accessToken', accessToken)

  localStorage.setItem('accessToken', accessToken)

  // set the user store
  useUserStore.getState().setUser(account.user)

  //set the account store
  useAccountStore.getState().setIsComplete(account.isComplete)

  return account ? account : null
}

async function signOut() {
  console.log('signOut')

  await httpService.put('auth/signout', null)

  storeService.clearStoreStates()
  localStorage.removeItem('accessToken')
}

export const authService = { signIn, signOut, registration }
