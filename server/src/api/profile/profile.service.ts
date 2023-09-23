import { Types } from 'mongoose'
import BadRequestError from '../../errors/BadRequestError.js'
import ProfileModel, { Profile } from '../../mongodb/models/profile.model.js'
import logger from '../../service/logger.service.js'

async function createProfile(profile: Profile) {
  const { ID } = profile

  const isExist = await isIDExist(ID)

  if (isExist) {
    logger.warn(
      `profileService - attempt to create new profile with existing ID: ${ID}`
    )
    throw new BadRequestError('ID is already taken', ID)
  }

  const newProfile = await ProfileModel.create(profile)
  return newProfile
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
  createProfile,
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
