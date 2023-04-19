import { AxiosResponse } from 'axios'
import { httpService } from './http.service'
import { IAuthResponse } from '../models/response/IAuthResponse'
import { IAuthCredentials } from '../models/User'
import useUserStore from '../stores/userStore'

async function signIn(email: string, password: string) {
  const response = await httpService.post<IAuthCredentials, IAuthResponse>(
    'auth/signin',
    { email, password }
  )

  // get the user and the tokens from the response
  const { user, refreshToken, accessToken } = response.data

  // save the tokens to the session storage
  sessionStorage.setItem('token', accessToken)

  // set the user store
  useUserStore.setState((state) => state.setUser(user))
  useUserStore.setState((state) => state.setAuth({ isAuth: true }))
}

async function signOut() {
  await httpService.put('auth/signout', null)

  sessionStorage.removeItem('token')
  useUserStore.setState((state) => state.setUser(null))
  useUserStore.setState((state) => state.setAuth({ isAuth: false }))
}

async function registration(email: string, password: string) {
  const response = await httpService.post<IAuthCredentials, IAuthResponse>(
    'auth/registration',
    { email, password }
  )

  // get the user and the tokens from the response
  const { user, refreshToken, accessToken } = response.data

  // save the tokens to the session storage
  sessionStorage.setItem('token', accessToken)

  // set the user store
  useUserStore.setState((state) => state.setUser(user))
  useUserStore.setState((state) => state.setAuth({ isAuth: true }))
}

export const authService = { signIn, signOut, registration }
