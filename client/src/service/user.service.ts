import { AxiosResponse } from 'axios'
import { httpService } from './http.service'
import { User } from '../models/User'

export const userService = {
  getAccounts,
}

async function getAccounts(): Promise<AxiosResponse<User[]>> {
  return await httpService.get<null, User[]>('auth/account', null)
}
