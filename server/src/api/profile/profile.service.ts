import { Types } from 'mongoose'
import BadRequestError from '../../errors/BadRequestError.js'
import ProfileModel, { Profile } from '../../mongodb/models/profile.model.js'
import logger from '../../service/logger.service.js'

async function createBlankProfile(): Promise<
  (Profile & { _id: Types.ObjectId }) | null
> {
  const profile = await ProfileModel.create({})

  logger.info(`profileService - profile has been created: ${profile}`)

  return profile
}

async function createProfile(profile: Profile) {
  const { ID } = profile

  const isExist = await isIDExist(ID)

  if (isExist) {
    logger.warn(
      `profileService - attempt to create new profile with existing ID: ${ID}`
    )
    throw new BadRequestError('Person with this ID already exists', ID)
  }

  const newProfile = await ProfileModel.create(profile)
  return newProfile
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

  logger.info(`profileService - profile updated ${profile}`)

  return profile
}

async function getProfileByID(ID: string) {
  const profile = await ProfileModel.findOne({ ID })
  return profile
}

async function getProfileByIdentifier(identifier: Types.ObjectId) {
  const profile = await ProfileModel.findOne(identifier)
  return profile
}

export const profileService = {
  createBlankProfile,
  createProfile,
  updateProfile,
  getProfileByID,
  getProfileByIdentifier,
}

const isIDExist = async (ID: string) => {
  try {
    const existingID = await ProfileModel.findOne({ ID })
    return existingID ? true : false
  } catch (error) {
    throw error
  }
}
