import { AxiosResponse } from 'axios'
import { Profile } from '../models/Profile'
import { httpService } from './axios/http.service'

async function createProfile(
  profile: Profile
): Promise<AxiosResponse<Profile>> {
  const response = await httpService.post<Profile, Profile>(
    '/createProfile',
    profile
  )

  console.log('profileService - createProfile, response data', response)

  const { newProfile } = response.data as any

  return newProfile ? newProfile : null
}

export const profileService = {
  createProfile,
}
