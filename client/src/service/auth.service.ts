import { AxiosResponse } from 'axios'
import { httpService } from './http.service'
import { IAuthResponse } from '../models/response/IAuthResponse'
import { IAuthCredentials } from '../models/User'

async function signIn(
  email: string,
  password: string
): Promise<AxiosResponse<IAuthResponse>> {
  return await httpService.post<IAuthCredentials, IAuthResponse>(
    'auth/signin',
    { email, password }
  )
}

async function signOut(): Promise<AxiosResponse> {
  return await httpService.put('auth/signout', null)
}

async function registration(
  email: string,
  password: string
): Promise<AxiosResponse<IAuthResponse>> {
  return await httpService.post<IAuthCredentials, IAuthResponse>(
    'auth/registration',
    { email, password }
  )
}

export const authService = { signIn, signOut, registration }
