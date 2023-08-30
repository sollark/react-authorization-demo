import { AxiosResponse } from 'axios'
import { httpService } from './axios/http.service'
import { User } from '../models/Profile'

export const userService = {
  getAccounts,
}

async function getAccounts(): Promise<AxiosResponse<User[]>> {
  return await httpService.get<null, User[]>('auth/account', null)
}
