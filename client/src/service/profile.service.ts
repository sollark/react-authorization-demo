import { Profile } from '../models/Profile'
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  httpService,
} from './axios/http.service'
import { log } from './console.service'

type ProfileData = {
  newProfile: Profile
}

// TODO Get a blank profile from server
async function createBlankProfile(profile: Profile): Promise<Profile | null> {
  const response = await httpService.post<Profile, ProfileData>(
    '/createBlankProfile',
    profile
  )

  const data = handleResponse(response, 'profileService - createBlankProfile')

  return data?.newProfile || null
}

export const profileService = {
  createBlankProfile,
}

function handleResponse<T>(
  response: ApiSuccessResponse<T> | ApiErrorResponse | null,
  functionName: string
): T | null {
  if (!response) {
    log(`${functionName}, no response from the server`)
    return null
  }

  if (!response.success) {
    log(`${functionName}, message`, response.message)
    return null
  }

  return response.data || null
}
