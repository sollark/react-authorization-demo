import { Account } from '@/models/Account'
import { AuthCredentials } from '@/models/Auth'
import { AuthResponse } from '../models/response/AuthResponse'
import useUserStore from '../stores/userStore'
import { httpService } from './axios/http.service'
import useAccountStore from '@/stores/accountStore'
import useOrganizationStore from '@/stores/orgainzaionStore'
import useRoleStore from '@/stores/roleStore'
import { storeService } from './store.servies'

async function registration(email: string, password: string) {
  const response = await httpService.post<AuthCredentials, AuthResponse>(
    'auth/registration',
    { email, password }
  )

  const { account, refreshToken, accessToken } = response as any

  localStorage.setItem('accessToken', accessToken)

  // set the user store
  useUserStore.setState({ user: account.user })

  // set the account store
  useAccountStore.setState({ isComplete: account.isComplete })

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
  useUserStore.setState({ user: account.user })

  //set the account store
  useAccountStore.setState({ isComplete: account.isComplete })

  return account ? account : null
}

async function signOut() {
  await httpService.put('auth/signout', null)

  storeService.clearStoreStates()
  localStorage.removeItem('accessToken')
}

export const authService = { signIn, signOut, registration }
