import { Types } from 'mongoose'
import BadRequestError from '../../errors/BadRequestError.js'
import AccountModel, {
  Account,
  Status,
} from '../../mongodb/models/account.model.js'
import CompanyModel from '../../mongodb/models/company.model.js'
import ProfileModel, { Profile } from '../../mongodb/models/profile.model.js'
import RoleModel, { Role, USER_ROLE } from '../../mongodb/models/role.model.js'
import WorkplaceRefModel, {
  Workplace,
} from '../../mongodb/models/workplace.model.js'
import logger from '../../service/logger.service.js'

async function createAccount(
  identifier: Types.ObjectId,
  profileId: Types.ObjectId
): Promise<Partial<Account>> {
  const role = USER_ROLE.User
  const roleDoc = await RoleModel.findOne({ role }).exec()

  const accountRef = await AccountModel.create({
    identifier,
    profile: profileId,
    role: roleDoc?._id,
  })

  if (!accountRef) {
    logger.warn(`accountService - cannot create account: ${identifier}`)
    throw new BadRequestError('Account creation failed')
  }

  const account = await AccountModel.findById(accountRef._id)
    .populate<{ profile: Profile }>('profile')
    .populate<{ role: Role }>('role')
    .populate<{ workplace: Workplace }>('workplace')
    .populate<{ status: Status }>('status')
    .lean()
    .exec()

  if (!account) {
    logger.warn(`accountService - account is not found: ${identifier}`)
    throw new BadRequestError('Account is not found')
  }

  logger.info(
    `accountService - account is created:  ${JSON.stringify(
      account,
      null,
      2 // Indentation level, adjust as needed
    )}`
  )

  return account
}

async function setRole(identifier: Types.ObjectId, role: Role) {
  const roleDoc = await RoleModel.findOne({ role }).exec()

  const account = await AccountModel.findOneAndUpdate(
    { identifier },
    { role: roleDoc?._id },
    { new: true }
  ).exec()
}

async function getAccount(identifier: Types.ObjectId): Promise<Account> {
  const account = await AccountModel.findOne({ identifier })
    .populate<{ role: Role }>('role')
    .populate<{ profile: Profile }>('profile')
    .populate<{ workplace: Workplace }>({
      path: 'workplace',
      populate: [
        { path: 'company' },
        { path: 'department' },
        { path: 'employee' },
        { path: 'supervisor' },
        { path: 'subordinates' },
      ],
    })
    .populate<{ status: Status }>('status')
    .lean()
    .exec()

  if (!account) {
    logger.warn(`accountService - account is not found: ${identifier}`)
    throw new BadRequestError('Account is not found')
  }

  logger.info(
    `accountService - account fetched: ${JSON.stringify(
      account,
      null,
      2 // Indentation level, adjust as needed
    )}`
  )

  return account
}

async function deleteAccount(identifier: Types.ObjectId) {
  await AccountModel.findOneAndDelete({ identifier })
}

async function addWorkplace(
  identifier: Types.ObjectId,
  workplaceId: Types.ObjectId
): Promise<(Account & { _id: Types.ObjectId }) | null> {
  const account = await AccountModel.findOneAndUpdate(
    { identifier },
    { $set: { workplace: workplaceId } },
    { new: true }
  )
    .populate<{ role: Role }>('role')
    .populate<{ profile: Profile }>('profile')
    .populate<{ workplace: Workplace }>({
      path: 'workplace',
      populate: [
        { path: 'company' },
        { path: 'department' },
        { path: 'employee' },
        { path: 'supervisor' },
        { path: 'subordinates' },
      ],
    })
    .populate<{ status: Status }>('status')
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
    .populate<{ role: Role }>('role')
    .populate<{ profile: Profile }>('profile')
    .populate<{ workplace: Workplace }>({
      path: 'workplace',
      populate: [
        { path: 'company' },
        { path: 'department' },
        { path: 'employee' },
        { path: 'supervisor' },
        { path: 'subordinates' },
      ],
    })
    .populate<{ status: Status }>('status')
    .lean()
    .exec()

  if (!updatedAccount) {
    logger.warn(`accountService - cannot update account: ${accountId}`)
    throw new BadRequestError('Account cannot be updated')
  }

  logger.info(
    `accountService - account is completed: ${JSON.stringify(
      updatedAccount,
      null,
      2 // Indentation level, adjust as needed
    )}`
  )

  return updatedAccount
}

function sortAccountData(
  accountData: any
): [
  updatedProfileData: Object,
  updatedWorkplaceData: Object,
  updatedCompanyData: Object
] {
  const profileSchemaKeys = Object.keys(ProfileModel.schema.paths)
  const workplaceSchemaKeys = Object.keys(WorkplaceRefModel.schema.paths)
  const companySchemaKeys = Object.keys(CompanyModel.schema.paths)

  const { updatedProfileData, updatedWorkplaceData, updatedCompanyData } =
    Object.entries(accountData).reduce(
      (accumulator: any, [key, value]) => {
        if (profileSchemaKeys.includes(key)) {
          accumulator.updatedProfileData[key] = value
        } else if (workplaceSchemaKeys.includes(key)) {
          accumulator.updatedWorkplaceData[key] = value
        } else if (companySchemaKeys.includes(key)) {
          accumulator.updatedCompanyData[key] = value
        }
        return accumulator
      },
      {
        updatedProfileData: {},
        updatedWorkplaceData: {},
        updatedCompanyData: {},
      }
    )

  return [updatedProfileData, updatedWorkplaceData, updatedCompanyData]
}

export const accountService = {
  createAccount,
  setRole,
  getAccount,
  deleteAccount,
  addWorkplace,
  sortAccountData,
  completeAccount,
}
