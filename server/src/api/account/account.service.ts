import { Types } from 'mongoose'
import BadRequestError from '../../errors/BadRequestError.js'
import AccountModel, {
  Account,
  AccountDoc,
  Role,
  Status,
} from '../../mongodb/models/account.model.js'
import CompanyModel, { Company } from '../../mongodb/models/company.model.js'
import DepartmentModel, {
  Department,
} from '../../mongodb/models/department.model.js'
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
    // returns new version of document, if false returns original version, before updates
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

async function getEmployeeAccountDoc(
  employeeId: Types.ObjectId
): Promise<(AccountDoc & { _id: Types.ObjectId }) | null> {
  const accountDoc = await AccountModel.findOne({ employee: employeeId })
    .lean()
    .exec()

  // logger.info(
  //   `accountService- getEmployeeAccountDoc, account fetched: ${JSON.stringify(
  //     accountDoc,
  //     null,
  //     2 // Indentation level, adjust as needed
  //   )}`
  // )
  return accountDoc
}

async function deleteAccount(identifier: Types.ObjectId) {
  await AccountModel.findOneAndDelete({ identifier })
}

async function setProfile(
  accountId: Types.ObjectId,
  profileId: Types.ObjectId
) {
  const accountDoc = await AccountModel.findById(accountId)
  if (!accountDoc) throw new BadRequestError('Account is not found')

  const oldProfileId = accountDoc.profile
  if (oldProfileId) await profileService.deleteProfile(oldProfileId)

  const account = await AccountModel.findByIdAndUpdate(
    accountId,
    { profile: profileId },
    // returns new version of document, if false returns original version, before updates
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

async function connectEmployee(
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
    // returns new version of document, if false returns original version, before updates
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

async function disconnectEmployee(accountId: Types.ObjectId) {
  const account = await AccountModel.findByIdAndUpdate(
    accountId,
    {
      $unset: {
        employee: 1,
        isComplete: false,
      },
    },
    // returns new version of document, if false returns original version, before updates
    { new: true }
  )

  logger.info(`accountService - disconnectEmployee, accountId: ${accountId}`)
}

async function completeAccount(
  accountId: Types.ObjectId
): Promise<(Account & { _id: Types.ObjectId }) | null> {
  const updatedAccount = await AccountModel.findByIdAndUpdate(
    accountId,
    { isComplete: true },
    // returns new version of document, if false returns original version, before updates
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
  updatedProfileData: Partial<Profile>,
  updateEmployeeData: Partial<Employee>,
  updatedCompanyData: Partial<Company>,
  updatedDepartmentData: Partial<Department>
] {
  // const [
  //   updatedProfileData,
  //   updateEmployeeData,
  //   updatedCompanyData,
  //   updatedDepartmentData,
  // ] = accountService.sortAccountData(accountData)

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

  console.log('sortAccountData, updatedProfileData: ', updatedProfileData)
  console.log('sortAccountData, updateEmployeeData: ', updateEmployeeData)
  console.log('sortAccountData, updatedCompanyData: ', updatedCompanyData)
  console.log('sortAccountData, updatedDepartmentData: ', updatedDepartmentData)

  return [
    updatedProfileData as Partial<Profile>,
    updateEmployeeData as Partial<Employee>,
    updatedCompanyData as Partial<Company>,
    updatedDepartmentData as Partial<Department>,
  ]
}

export const accountService = {
  createAccount,
  setRole,
  getAccount,
  getAccountDoc,
  getEmployeeAccountDoc,
  deleteAccount,
  setProfile,
  connectEmployee,
  disconnectEmployee,
  sortAccountData,
  completeAccount,
}
