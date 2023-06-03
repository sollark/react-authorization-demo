import { Types } from 'mongoose'
import BadRequestError from '../errors/BadRequestError.js'
import UserModel, { User } from '../mongodb/models/user.model.js'
import loggerService from './logger.service.js'

async function addUser(identifier: Types.ObjectId) {
  const user = await UserModel.create({
    identifier,
  })

  loggerService.info(`user.service - user added: ${user}`)

  return user
}

async function getUserByIdentifier(
  identifier: Types.ObjectId
): Promise<User | null> {
  const user = await UserModel.findOne({ identifier })

  loggerService.info(`user.service - user fetched ${user}`)

  return user
}

async function updateUser(
  identifier: Types.ObjectId,
  name: string,
  lastname: string
): Promise<User | null> {
  const user = await UserModel.findOneAndUpdate(
    { identifier },
    { name, lastname },
    { new: true }
  )

  loggerService.info(`user.service - user updated ${user}`)

  return user
}

async function deleteUser(identifier: Types.ObjectId): Promise<void> {
  await UserModel.deleteOne({ identifier })
}

const getUserId = async (
  identifier: Types.ObjectId
): Promise<Types.ObjectId> => {
  const user = await UserModel.findOne({ identifier })
  if (!user) {
    loggerService.warn(`user.service - user is not found: ${identifier}`)
    throw new BadRequestError('User is not found')
  }

  return user._id
}

export const userService = {
  addUser,
  getUserByIdentifier,
  updateUser,
  deleteUser,
  getUserId,
}
