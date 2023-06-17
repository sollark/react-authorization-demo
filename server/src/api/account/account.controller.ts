import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError.js'
import UnauthorizedError from '../../errors/UnauthorizedError.js'
import {
  OrganizationCode,
  OrganizationCodeMap,
} from '../../mongodb/models/organizationCode.model.js'
import { asyncLocalStorage } from '../../service/als.service.js'
import logger from '../../service/logger.service.js'
import { organizationService } from '../../service/organization.service.js'
import { userService } from '../../service/user.service.js'
import { workspaceService } from '../../service/workspace.service.js'
import { accountService } from './account.service.js'

export async function updateAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const store = asyncLocalStorage.getStore()
  const identifier = store?.userData?.identifier

  if (!identifier) {
    logger.warn(`account.controller - unauthenticated request update account`)

    throw new UnauthorizedError('unauthenticated')
  }

  const account = req.body

  console.log('updateAccount account', account)

  const [updatedUserData, updatedWorkspaceData, updatedOrganizationData] =
    accountService.sortAccountData(account)

  console.log('updateAccount updatedUserData', updatedUserData)
  console.log('updateAccount updatedWorkspaceData', updatedWorkspaceData)
  console.log('updateAccount updatedOrganizationData', updatedOrganizationData)
  const updatedUser = await userService.updateUser(identifier, updatedUserData)

  const updatedWorkspace = await workspaceService.updateWorkspace(
    updatedWorkspaceData
  )

  const { organizationName, organizationCode } =
    updatedOrganizationData as Partial<OrganizationCodeMap>

  let workspace: any = null
  if (organizationCode)
    workspace = await joinExistingOrganization(organizationCode)

  if (organizationName) workspace = await joinNewOrganization(organizationName)

  const updatedAccount = await accountService.addWorkspace(
    identifier,
    workspace?._id
  )

  console.log('updateAccount updatedAccount', updatedAccount)

  res.status(200).json(updatedAccount)
}

export async function getAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const store = asyncLocalStorage.getStore()
  // const identifier = store?.userData?.identifier
  // if (!identifier) {
  //   logger.warn(`user.controller - unauthenticated request to fetch user `)
  //   return new UnauthorizedError('unauthenticated')
  // }
  // const user = await userService.getUserByIdentifier(identifier)
  // res.status(200).json(user)
}

// export async function getUser(req: Request, res: Response, next: NextFunction) {
//   const store = asyncLocalStorage.getStore()
//   const identifier = store?.userData?.identifier

//   if (!identifier) {
//     logger.warn(`user.controller - unauthenticated request to fetch user `)
//     return new UnauthorizedError('unauthenticated')
//   }

//   const user = await userService.getUserByIdentifier(identifier)

//   res.status(200).json(user)
// }

async function joinExistingOrganization(organizationCode: OrganizationCode) {
  const organization = await organizationService.getOrganization(
    organizationCode
  )

  if (!organization)
    throw new BadRequestError(
      'Organization not found',
      organizationCode.toString()
    )

  // at first sign in user gets employee role at chosen organization, later it can be changed by manager
  const workspace = await workspaceService.getWorkspace(organization._id, [
    'Employee',
  ])
  if (workspace) return workspace

  // if user workspace is not exist, create it
  const newWorkspace = await workspaceService.addWorkspace(organization._id, [
    'Employee',
  ])

  return newWorkspace
}

async function joinNewOrganization(name: string) {
  const organization = await organizationService.addOrganization(name)
  const workspace = await workspaceService.addWorkspace(organization._id, [
    'Manager',
  ])

  return workspace
}
