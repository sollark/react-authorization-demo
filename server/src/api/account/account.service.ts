import { Types } from 'mongoose'
import BadRequestError from '../../errors/BadRequestError.js'
import AccountModel, { Account } from '../../mongodb/models/account.model.js'
import OrganizationModel from '../../mongodb/models/organization.model.js'
import UserModel from '../../mongodb/models/user.model.js'
import WorkspaceRefModel from '../../mongodb/models/workspace.model.js'
import logger from '../../service/logger.service.js'

async function createAccount(
  identifier: Types.ObjectId,
  userId: Types.ObjectId,
  isComplete: boolean = false
): Promise<Account> {
  const accountRef = await AccountModel.create({
    identifier,
    userId,
    isComplete,
  })

  if (!accountRef) {
    logger.warn(`accountService - cannot create account: ${identifier}`)
    throw new BadRequestError('Cannot create account')
  }

  const account = await AccountModel.findById(accountRef._id)
    .populate('user')
    .lean()
    .exec()

  if (!account) {
    logger.warn(`accountService - account is not found: ${identifier}`)
    throw new BadRequestError('Account is not found')
  }

  logger.info(`accountService - account added: ${account}`)

  return account
}

// TODO Role is returned as ids, need turn it to codes and send to client !!!!
async function getAccount(identifier: Types.ObjectId): Promise<Account> {
  const account = await AccountModel.findOne({ identifier })
    .populate('user')
    .populate({
      path: 'workspaces',
      populate: [{ path: 'organization' }, { path: 'roles' }],
    })
    .lean()
    .exec()

  if (!account) {
    logger.warn(`accountService - account is not found: ${identifier}`)
    throw new BadRequestError('Account is not found')
  }

  logger.info(`accountService - account fetched: ${account}`)

  return account
}

async function deleteAccount(identifier: Types.ObjectId) {
  await AccountModel.findOneAndDelete({ identifier })
}

async function addWorkspace(
  identifier: Types.ObjectId,
  workspaceId: Types.ObjectId
) {
  const account = await AccountModel.findOneAndUpdate(
    { identifier },
    { $push: { workspaces: workspaceId } },
    { new: true }
  )
    .populate('user')
    .populate({
      path: 'workspaces',
      populate: { path: 'organization' },
    })
    .lean()
    .exec()

  return account
}

function sortAccountData(
  accountData: any
): [
  updatedUserData: Object,
  updatedWorkspaceData: Object,
  updatedOrganizationData: Object
] {
  const userSchemaKeys = Object.keys(UserModel.schema.paths)
  const workspaceSchemaKeys = Object.keys(WorkspaceRefModel.schema.paths)
  const organizationSchemaKeys = Object.keys(OrganizationModel.schema.paths)

  const { updatedUserData, updatedWorkspaceData, updatedOrganizationData } =
    Object.entries(accountData).reduce(
      (accumulator: any, [key, value]) => {
        if (userSchemaKeys.includes(key)) {
          accumulator.updatedUserData[key] = value
        } else if (workspaceSchemaKeys.includes(key)) {
          accumulator.updatedWorkspaceData[key] = value
        } else if (organizationSchemaKeys.includes(key)) {
          accumulator.updatedOrganizationData[key] = value
        }
        return accumulator
      },
      {
        updatedUserData: {},
        updatedWorkspaceData: {},
        updatedOrganizationData: {},
      }
    )

  return [updatedUserData, updatedWorkspaceData, updatedOrganizationData]
}

async function completeAccount(accountId: Types.ObjectId) {
  const updatedAccount = await AccountModel.findByIdAndUpdate(
    accountId,
    { isComplete: true },
    { new: true }
  )
    .populate('user')
    .populate({
      path: 'workspaces',
      populate: { path: 'organization' },
    })
    .lean()
    .exec()

  return updatedAccount
}

export const accountService = {
  createAccount,
  getAccount,
  deleteAccount,
  addWorkspace,
  sortAccountData,
  completeAccount,
}
