import { Profile } from '../models/Profile'
import { httpService } from './axios/http.service'
import { log } from './console.service'

type ProfileData = {
  newProfile: Profile
}

async function createBlankProfile(profile: Profile): Promise<Profile | null> {
  const data = await httpService.post<Profile, ProfileData>(
    '/createBlankProfile',
    profile
  )

  log('profileService - createBlankProfile, data', data)

  return data?.newProfile || null
}

export const profileService = {
  createBlankProfile,
}
