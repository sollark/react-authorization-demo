import { AxiosResponse } from 'axios'
import { Profile } from '../models/Profile'
import { httpService } from './axios/http.service'

async function createBlankProfile(
  profile: Profile
): Promise<AxiosResponse<Profile>> {
  const response = await httpService.post<Profile, Profile>(
    '/createBlankProfile',
    profile
  )

  console.log('profileService - createBlankProfile, response data', response)

  const { newProfile } = response.data as any

  return newProfile ? newProfile : null
}

export const profileService = {
  createBlankProfile,
}
