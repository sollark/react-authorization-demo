import { Types } from 'mongoose'
import BadRequestError from '../../errors/BadRequestError.js'
import AccountModel, { Account } from '../../mongodb/models/account.model.js'
import UserModel from '../../mongodb/models/user.model.js'
import logger from '../../service/logger.service.js'
import WorkspaceRefModel from '../../mongodb/models/workspace.model.js'
import OrganizationModel from '../../mongodb/models/organization.model.js'

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
  const account = await AccountModel.findOne({ identifier })
    .populate('user')
    .populate({
      path: 'workspaces',
      populate: { path: 'organization' },
    })

  if (!account) {
    logger.warn(`account.service - account is not found: ${identifier}`)
    throw new BadRequestError('Account is not found')
  }

  logger.info(`account.service - account fetched: ${account}`)

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

export const accountService = {
  createAccount,
  getAccount,
  deleteAccount,
  addWorkspace,
  sortAccountData,
}
