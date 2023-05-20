import UserModel, { User } from '../mongodb/models/user.model.js'
import loggerService from './logger.service.js'

const addUser = async (
  identifier: string,
  firstName: string,
  lastname: string
): Promise<User> => {
  const user = await UserModel.create({
    identifier,
    firstName,
    lastname,
  })

  loggerService.info(`user.service - user added: ${user}`)

  return user
}

const getUser = async (identifier: string): Promise<User | null> => {
  const user = await UserModel.findOne({ identifier })

  loggerService.info(`user.service - user fetched ${user}`)

  return user
}

const updateUser = async (
  identifier: string,
  name: string,
  lastname: string
): Promise<User | null> => {
  const user = await UserModel.findOneAndUpdate(
    { identifier },
    { name, lastname },
    { new: true }
  )

  loggerService.info(`user.service - user updated ${user}`)

  return user
}

const deleteUser = async (identifier: string): Promise<void> => {
  await UserModel.deleteOne({ identifier })
}

export const userService = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
}
