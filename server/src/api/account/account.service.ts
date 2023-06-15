import { Types } from 'mongoose'
import BadRequestError from '../../errors/BadRequestError.js'
import AccountModel, { Account } from '../../mongodb/models/account.model.js'
import UserModel from '../../mongodb/models/user.model.js'
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

  return accountDoc
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

  return accountDoc
}

// TODO controller has updateAccount function and it take care of user updating

async function updateAccount(identifier: Types.ObjectId, account: Account) {
  // console.log('updateAccount', account)
  // const updatedAccountDoc = await AccountModel.findOneAndUpdate({
  //   ...account,
  //   identifier,
  // })

  // if (!updatedAccountDoc) {
  //   logger.warn(`account.service - account is not found: ${identifier}`)
  //   throw new BadRequestError('Account is not found')
  // }

  const userSchemaKeys = Object.keys(UserModel.schema.paths)
  const workspaceSchemaKeys = Object.keys(workspace.schema.paths)

  const updatedUserData = {}
  const updatedWorkspaceData = {}

  Object.entries(updates).forEach(([key, value]) => {
    if (userSchemaKeys.includes(key)) {
      updatedUserData[key] = value
    } else if (workspaceSchemaKeys.includes(key)) {
      updatedWorkspaceData[key] = value
    }
  })

  console.log('updatedAccountDoc', updatedAccountDoc)

  return updatedAccountDoc
}

async function deleteAccount(identifier: Types.ObjectId) {
  await AccountModel.findOneAndDelete({ identifier })
}

async function addWorkspace(
  identifier: Types.ObjectId,
  workspaceId: Types.ObjectId
) {
  const account = await AccountModel.findOne({ identifier })

  if (account) {
    account.workspaces.push(workspaceId)
    await account.save()
  }
}

export const accountService = {
  createAccount,
  getAccount,
  updateAccount,
  deleteAccount,
  addWorkspace,
}
