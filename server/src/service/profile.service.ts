import { Types } from 'mongoose'
import BadRequestError from '../errors/BadRequestError.js'
import ProfileModel, { Profile } from '../mongodb/models/profile.model.js'
import loggerService from './logger.service.js'

async function createProfile(identifier: Types.ObjectId) {
  const profile = await ProfileModel.create({ identifier })

  loggerService.info(`profile.service - profile added: ${profile}`)

  return profile
}

async function getProfileByIdentifier(
  identifier: Types.ObjectId
): Promise<Profile | null> {
  const profile = await ProfileModel.findOne({ identifier })

  loggerService.info(`profile.service - profile fetched ${profile}`)

  return profile
}

async function updateProfile(
  identifier: Types.ObjectId,
  updatedProfileData: Partial<Profile>
): Promise<Profile | null> {
  const profile = await ProfileModel.findOneAndUpdate(
    { identifier },
    updatedProfileData,
    { new: true }
  )

  loggerService.info(`profile.service - profile updated ${profile}`)

  return profile
}

async function deleteProfile(identifier: Types.ObjectId): Promise<void> {
  await ProfileModel.deleteOne({ identifier })
}

async function getProfileId(
  identifier: Types.ObjectId
): Promise<Types.ObjectId> {
  const profile = await ProfileModel.findOne({ identifier })
  if (!profile) {
    loggerService.warn(`profile.service - profile is not found: ${identifier}`)
    throw new BadRequestError('Profile is not found')
  }

  return profile._id
}

export const profileService = {
  createProfile,
  getProfileByIdentifier,
  updateProfile,
  deleteProfile,
  getProfileId,
}
