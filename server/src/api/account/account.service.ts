// import { UserRole, USER_ROLE } from '../../config/userRoles.js'
import { Types } from 'mongoose'
import BadRequestError from '../../errors/BadRequestError.js'
import AccountModel from '../../mongodb/models/account.model.js'
import logger from '../../service/logger.service.js'

const addAccount = async (
  user: Types.ObjectId
  // name?: string,
  // lastname?: string
  // organization: string,
  // roles: UserRole[] = [USER_ROLE.Guest] as UserRole[]
) => {
  const account = await AccountModel.create({ user })

  logger.info(`account.service - account added: ${account}`)

  return account
}

const getAccount = async (user: Types.ObjectId) => {
  const account = await AccountModel.findOne({ user })

  if (!account) {
    logger.warn(`account.service - account is not found: ${user}`)
    throw new BadRequestError('Account is not found')
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
