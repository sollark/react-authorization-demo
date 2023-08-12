import { Types } from 'mongoose'
import BadRequestError from '../../errors/BadRequestError.js'
import AccountModel, { Account } from '../../mongodb/models/account.model.js'
import OrganizationModel from '../../mongodb/models/organization.model.js'
import UserModel, { User } from '../../mongodb/models/user.model.js'
import WorkspaceRefModel, {
  Workspace,
} from '../../mongodb/models/workspace.model.js'
import { codeService } from '../../service/code.service.js'
import logger from '../../service/logger.service.js'

async function createAccount(
  identifier: Types.ObjectId,
  userId: Types.ObjectId,
  isComplete: boolean = false
) {
  const accountRef = await AccountModel.create({
    identifier,
    user: userId,
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

  logger.info(
    `accountService - account added:  ${JSON.stringify(
      account,
      null,
      2 // Indentation level, adjust as needed
    )}`
  )

  return account
}

async function getAccount(identifier: Types.ObjectId): Promise<Account> {
  const account = await AccountModel.findOne({ identifier })
    .populate<{ user: User }>('user')
    .populate<{ workspaces: Workspace[] }>({
      path: 'workspaces',
      populate: [{ path: 'organization' }, { path: 'roles' }],
    })
    .lean()
    .exec()

  if (!account) {
    logger.warn(`accountService - account is not found: ${identifier}`)
    throw new BadRequestError('Account is not found')
  }

  const encodedWorkspaces = await codeService.encodeWorkspace(
    account.workspaces
  )

  logger.info(
    `accountService - account fetched: ${JSON.stringify(
      account,
      null,
      2 // Indentation level, adjust as needed
    )}`
  )

  return { ...account, workspaces: encodedWorkspaces }
}

async function deleteAccount(identifier: Types.ObjectId) {
  await AccountModel.findOneAndDelete({ identifier })
}

async function addWorkspace(
  identifier: Types.ObjectId,
  workspaceId: Types.ObjectId
): Promise<(Account & { _id: Types.ObjectId }) | null> {
  const account = await AccountModel.findOneAndUpdate(
    { identifier },
    { $push: { workspaces: workspaceId } },
    { new: true }
  )
    .populate<{ user: User }>('user')
    .populate<{ workspaces: Workspace[] }>({
      path: 'workspaces',
      populate: [{ path: 'organization' }, { path: 'roles' }],
    })
    .lean()
    .exec()

  return account
}

async function completeAccount(
  accountId: Types.ObjectId
): Promise<(Account & { _id: Types.ObjectId }) | null> {
  const updatedAccount = await AccountModel.findByIdAndUpdate(
    accountId,
    { isComplete: true },
    { new: true }
  )
    .populate<{ user: User }>('user')
    .populate<{ workspaces: Workspace[] }>({
      path: 'workspaces',
      populate: [{ path: 'organization' }, { path: 'roles' }],
    })
    .lean()
    .exec()

  return updatedAccount
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
  completeAccount,
}
