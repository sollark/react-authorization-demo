import { AxiosResponse } from 'axios'
import { httpService } from './http.service'
import { IUser } from '../models/User'

export const userService = {
  getAccounts,
}

async function getAccounts(): Promise<AxiosResponse<IUser[]>> {
  return await httpService.get<null, IUser[]>('auth/account', null)
}
