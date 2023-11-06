import { Types } from 'mongoose'
import BadRequestError from '../errors/BadRequestError.js'
import ProfileModel, { Profile } from '../mongodb/models/profile.model.js'
import logger from './logger.service.js'

// TODO check if in use
async function createBlankProfile(): Promise<
  (Profile & { _id: Types.ObjectId }) | null
> {
  const profile = await ProfileModel.create({})

  logger.info(`profileService - profile has been created: ${profile}`)

  return profile
}

async function createProfile(
  profileData: Profile
): Promise<(Profile & { _id: Types.ObjectId }) | null> {
  const { ID } = profileData

  const isExist = await isIDExist(ID)

  if (isExist) {
    logger.warn(
      `profileService - attempt to create new profile with existing ID: ${ID}`
    )
    throw new BadRequestError('Person with this ID already exists', ID)
  }

  const profile = await ProfileModel.create(profileData)

  logger.info(`profileService - profile has been created: ${profile}`)

  return profile
}

async function getProfileByIdentifier(
  identifier: Types.ObjectId
): Promise<(Profile & { _id: Types.ObjectId }) | null> {
  const profile = await ProfileModel.findOne({ identifier })

  logger.info(`profileService - profile fetched ${profile}`)

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

  logger.info(`profileService - profile updated ${profile}`)

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
    logger.warn(`profileService - profile is not found: ${identifier}`)
    throw new BadRequestError('Profile is not found')
  }

  return profile._id
}

// export const profileService = {
//   createBlankProfile,
//   createProfile,
//   getProfileByIdentifier,
//   updateProfile,
//   deleteProfile,
//   getProfileDBId,
// }

const isIDExist = async (ID: string) => {
  try {
    const existingID = await ProfileModel.findOne({ ID })
    return existingID ? true : false
  } catch (error) {
    throw error
  }
}
