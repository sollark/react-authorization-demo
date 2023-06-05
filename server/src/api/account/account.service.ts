import { Types } from 'mongoose'
import BadRequestError from '../../errors/BadRequestError.js'
import AccountModel, { Account } from '../../mongodb/models/account.model.js'
import logger from '../../service/logger.service.js'

async function createAccount(
  identifier: Types.ObjectId,
  user: Types.ObjectId,
  isComplete: boolean = false
): Promise<Account> {
  const accountDoc = await (
    await AccountModel.create({ identifier, user, isComplete })
  ).populate('user')

  logger.info(`account.service - account added: ${accountDoc}`)

  // remove _id and __v from accountDoc
  const { _id, __v, ...account } = accountDoc.toObject()

  return account
}

async function getAccount(identifier: Types.ObjectId): Promise<Account> {
  const accountDoc = await AccountModel.findOne({ identifier }).populate(
    'user',
    'workspaces'
  )

  if (!accountDoc) {
    logger.warn(`account.service - account is not found: ${identifier}`)
    throw new BadRequestError('Account is not found')
  }

  logger.info(`account.service - account fetched: ${accountDoc}`)

  // remove _id and __v from accountDoc
  const { _id, __v, ...account } = accountDoc.toObject()

  return account
}

async function updateAccount(identifier: Types.ObjectId, account: Account) {
  const updatedAccountDoc = await AccountModel.findOneAndUpdate({
    ...account,
    identifier,
  })

  if (!updatedAccountDoc) {
    logger.warn(`account.service - account is not found: ${identifier}`)
    throw new BadRequestError('Account is not found')
  }

  return updatedAccountDoc
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
