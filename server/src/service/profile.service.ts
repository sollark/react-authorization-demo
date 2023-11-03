import { Types } from 'mongoose'
import BadRequestError from '../errors/BadRequestError.js'
import ProfileModel, { Profile } from '../mongodb/models/profile.model.js'
import loggerService from './logger.service.js'

async function createBlankProfile(): Promise<
  (Profile & { _id: Types.ObjectId }) | null
> {
  const profile = await ProfileModel.create({})

  loggerService.info(`profileService - profile has been created: ${profile}`)

  return profile
}

async function createProfile(
  profileData: Profile
): Promise<(Profile & { _id: Types.ObjectId }) | null> {
  const profile = await ProfileModel.create(profileData)

  loggerService.info(`profileService - profile has been created: ${profile}`)

  return profile
}

async function getProfileByIdentifier(
  identifier: Types.ObjectId
): Promise<(Profile & { _id: Types.ObjectId }) | null> {
  const profile = await ProfileModel.findOne({ identifier })

  loggerService.info(`profileService - profile fetched ${profile}`)

  return profile
}

async function updateProfile(
  profileId: Types.ObjectId,
  updatedProfileData: Partial<Profile>
): Promise<(Profile & { _id: Types.ObjectId }) | null> {
  const profile = await ProfileModel.findByIdAndUpdate(
    profileId,
    updatedProfileData,
    { new: true }
  ).exec()

  loggerService.info(`profileService - profile updated ${profile}`)

  return profile
}

async function deleteProfile(identifier: Types.ObjectId): Promise<void> {
  await ProfileModel.deleteOne({ identifier })
}

async function getProfileDBId(
  identifier: Types.ObjectId
): Promise<Types.ObjectId> {
  const profile = await ProfileModel.findOne({ identifier })
  if (!profile) {
    loggerService.warn(`profileService - profile is not found: ${identifier}`)
    throw new BadRequestError('Profile is not found')
  }

  return profile._id
}

export const profileService = {
  createBlankProfile,
  createProfile,
  getProfileByIdentifier,
  updateProfile,
  deleteProfile,
  getProfileDBId,
}
