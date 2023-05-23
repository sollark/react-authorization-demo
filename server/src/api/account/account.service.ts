// import { UserRole, USER_ROLE } from '../../config/userRoles.js'
import BadRequestError from '../../errors/BadRequestError.js'
import AccountModel from '../../mongodb/models/account.model.js'
import UserModel, { User } from '../../mongodb/models/user.model.js'
import logger from '../../service/logger.service.js'

const addAccount = async (
  identifier: string
  // name?: string,
  // lastname?: string
  // organization: string,
  // roles: UserRole[] = [USER_ROLE.Guest] as UserRole[]
) => {
  const user = await UserModel.create({ identifier })
  const account = await AccountModel.create({ user: user._id })

  logger.info(`account.service - account added: ${account}`)

  return account
}

const getAccount = async (identifier: string) => {
  const user = await UserModel.findOne({ identifier })

  if (!user) {
    logger.warn(`account.service - user is not found: ${identifier}`)
    throw new BadRequestError('User is not found', identifier)
  }

  const account = await AccountModel.findOne({ user: user._id })
  if (!account) {
    logger.warn(`account.service - account is not found: ${user.identifier}`)
    throw new BadRequestError('Account is not found', user.identifier)
  }

  logger.info(`account.service - account fetched: ${account}`)

  return account
}

const updateAccount = async () => {}

const deleteAccount = async () => {}

export const accountService = {
  addAccount,
  getAccount,
  updateAccount,
  deleteAccount,
}
