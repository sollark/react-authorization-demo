import { Types } from 'mongoose'
import BadRequestError from '../../errors/BadRequestError.js'
import AccountModel, { Account } from '../../mongodb/models/account.model.js'
import logger from '../../service/logger.service.js'

async function createAccount(
  identifier: Types.ObjectId,
  user: Types.ObjectId,
  isComplete: boolean = false
) {
  const account = await AccountModel.create({ identifier, user, isComplete })

  // TODO: add account is null check
  logger.info(`account.service - account added: ${account}`)

  return account
}

async function getAccount(identifier: Types.ObjectId): Promise<Account> {
  const account = await AccountModel.findOne({ identifier })

  if (!account) {
    logger.warn(`account.service - account is not found: ${identifier}`)
    throw new BadRequestError('Account is not found')
  }

  logger.info(`account.service - account fetched: ${account}`)

  return account
}

async function updateAccount(identifier: Types.ObjectId, account: Account) {
  const updatedAccount = await AccountModel.findOneAndUpdate({
    ...account,
    identifier,
  })

  if (!updatedAccount) {
    logger.warn(`account.service - account is not found: ${identifier}`)
    throw new BadRequestError('Account is not found')
  }

  return updatedAccount
}

async function deleteAccount(identifier: Types.ObjectId) {
  await AccountModel.findOneAndDelete({ identifier })
}

export const accountService = {
  createAccount,
  getAccount,
  updateAccount,
  deleteAccount,
}
