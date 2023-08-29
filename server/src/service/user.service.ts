import { Types } from 'mongoose'
import BadRequestError from '../errors/BadRequestError.js'
import ProfileModel, { Profile } from '../mongodb/models/profile.model.js'
import loggerService from './logger.service.js'

async function createUser(identifier: Types.ObjectId) {
  const user = await ProfileModel.create({
    identifier,
  })

  loggerService.info(`user.service - user added: ${user}`)

  return user
}

async function getUserByIdentifier(
  identifier: Types.ObjectId
): Promise<Profile | null> {
  const user = await ProfileModel.findOne({ identifier })

  loggerService.info(`user.service - user fetched ${user}`)

  return user
}

async function updateUser(
  identifier: Types.ObjectId,
  updatedUserData: Partial<Profile>
): Promise<Profile | null> {
  const user = await ProfileModel.findOneAndUpdate(
    { identifier },
    updatedUserData,
    { new: true }
  )

  loggerService.info(`user.service - user updated ${user}`)

  return user
}

async function deleteUser(identifier: Types.ObjectId): Promise<void> {
  await ProfileModel.deleteOne({ identifier })
}

const getUserId = async (
  identifier: Types.ObjectId
): Promise<Types.ObjectId> => {
  const user = await ProfileModel.findOne({ identifier })
  if (!user) {
    loggerService.warn(`user.service - user is not found: ${identifier}`)
    throw new BadRequestError('User is not found')
  }

  return user._id
}

export const userService = {
  createUser,
  getUserByIdentifier,
  updateUser,
  deleteUser,
  getUserId,
}
