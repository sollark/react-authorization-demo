import { AxiosResponse } from 'axios'
import { Profile } from '../models/Profile'
import { httpService } from './axios/http.service'

export const profileService = {
  getAccounts,
}

async function getAccounts(): Promise<AxiosResponse<Profile[]>> {
  return await httpService.get<null, Profile[]>('auth/account', null)
}
