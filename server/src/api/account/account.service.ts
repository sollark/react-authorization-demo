import { Types } from 'mongoose'
import BadRequestError from '../../errors/BadRequestError.js'
import AccountModel, {
  Account,
  AccountDoc,
  Role,
  Status,
} from '../../mongodb/models/account.model.js'
import CompanyModel from '../../mongodb/models/company.model.js'
import DepartmentModel from '../../mongodb/models/department.model.js'
import EmployeeModel, { Employee } from '../../mongodb/models/employee.model.js'
import ProfileModel, { Profile } from '../../mongodb/models/profile.model.js'
import logger from '../../service/logger.service.js'
import { employeeService } from '../employee/employee.service.js'
import { profileService } from '../profile/profile.service.js'

async function createAccount(
  identifier: Types.ObjectId,
  profileId: Types.ObjectId
): Promise<Partial<Account>> {
  const accountDoc = await AccountModel.create({
    identifier,
    profile: profileId,
  })

  if (!accountDoc) {
    logger.warn(`accountService - cannot create account: ${identifier}`)
    throw new BadRequestError('Could not create account')
  }

  const account = await AccountModel.findById(accountDoc._id)
    .populate<{ profile: Profile }>('profile')
    .populate<{ employee: Employee }>('employee')
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

async function setRole(accountId: Types.ObjectId, role: Role) {
  const account = await AccountModel.findByIdAndUpdate(
    accountId,
    { role },
    { new: true }
  ).exec()
}

async function getAccount(
  identifier: Types.ObjectId
): Promise<(Account & { _id: Types.ObjectId }) | null> {
  const account = await AccountModel.findOne({ identifier })
    .populate<{ role: Role }>('role')
    .populate<{ profile: Profile }>('profile')
    .populate<{ employee: Employee }>({
      path: 'employee',
      populate: [
        {
          path: 'company',
          select: 'companyName companyNumber',
        },
        {
          path: 'department',
          select: 'departmentName',
        },
        { path: 'profile' },
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

async function getAccountDoc(
  identifier: Types.ObjectId
): Promise<(AccountDoc & { _id: Types.ObjectId }) | null> {
  const account = await AccountModel.findOne({ identifier }).lean().exec()

  if (!account) {
    logger.warn(`accountService - account is not found: ${identifier}`)
    throw new BadRequestError('Account is not found')
  }

  return account
}

async function deleteAccount(identifier: Types.ObjectId) {
  await AccountModel.findOneAndDelete({ identifier })
}

async function setProfile(
  accountId: Types.ObjectId,
  profileId: Types.ObjectId
) {
  const accountDoc = await AccountModel.findById(accountId).exec()
  if (!accountDoc) throw new BadRequestError('Account is not found')

  const oldProfileId = accountDoc.profile
  if (oldProfileId) await profileService.deleteProfile(oldProfileId)

  const account = await AccountModel.findByIdAndUpdate(
    accountId,
    { profile: profileId },
    { new: true }
  )
    .lean()
    .exec()

  if (!account) {
    logger.warn(
      `accountService - cannot set profile: ${accountId} ${profileId}`
    )
    throw new BadRequestError('Account cannot be updated')
  }

  logger.info(`accountService - setProfile, profileId: ${profileId}`)
}

async function setEmployee(
  accountId: Types.ObjectId,
  employeeId: Types.ObjectId
): Promise<(Account & { _id: Types.ObjectId }) | null> {
  const profileId = await employeeService.getProfileId(employeeId)

  // TODO: check if employee is already assigned to another account
  // TODO: check if account has already assigned profile. Can be separate function to set profile
  const account = await AccountModel.findByIdAndUpdate(
    accountId,
    {
      $set: {
        employee: employeeId,
        profile: profileId,
        isComplete: true,
      },
    },
    { new: true }
  )
    .populate<{ role: Role }>('role')
    .populate<{ profile: Profile }>('profile')
    .populate<{ employee: Employee }>({
      path: 'employee',
      populate: [
        {
          path: 'company',
          select: 'companyName companyNumber',
        },
        {
          path: 'department',
          select: 'departmentName',
        },
        { path: 'profile' },
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
    .populate<{ employee: Employee }>({
      path: 'employee',
      populate: [
        {
          path: 'company',
          select: 'companyName companyNumber',
        },
        {
          path: 'department',
          select: 'departmentName',
        },
        { path: 'profile' },
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
  updateEmployeeData: Object,
  updatedCompanyData: Object,
  updatedDepartmentData: Object
] {
  const profileSchemaKeys = Object.keys(ProfileModel.schema.paths)
  const employeeSchemaKeys = Object.keys(EmployeeModel.schema.paths)
  const companySchemaKeys = Object.keys(CompanyModel.schema.paths)
  const departmentSchemaKeys = Object.keys(DepartmentModel.schema.paths)

  const {
    updatedProfileData,
    updateEmployeeData,
    updatedCompanyData,
    updatedDepartmentData,
  } = Object.entries(accountData).reduce(
    (accumulator: any, [key, value]) => {
      if (profileSchemaKeys.includes(key)) {
        accumulator.updatedProfileData[key] = value
      } else if (employeeSchemaKeys.includes(key)) {
        accumulator.updateEmployeeData[key] = value
      } else if (companySchemaKeys.includes(key)) {
        accumulator.updatedCompanyData[key] = value
      } else if (departmentSchemaKeys.includes(key)) {
        accumulator.updatedDepartmentData[key] = value
      }
      return accumulator
    },
    {
      updatedProfileData: {},
      updateEmployeeData: {},
      updatedCompanyData: {},
      updatedDepartmentData: {},
    }
  )

  return [
    updatedProfileData,
    updateEmployeeData,
    updatedCompanyData,
    updatedDepartmentData,
  ]
}

export const accountService = {
  createAccount,
  setRole,
  getAccount,
  getAccountDoc,
  deleteAccount,
  setProfile,
  setEmployee,
  sortAccountData,
  completeAccount,
}
