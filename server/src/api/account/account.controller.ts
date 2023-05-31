import { NextFunction, Request, Response } from 'express'
import { asyncLocalStorage } from '../../service/als.service.js'
import UnauthorizedError from '../../errors/UnauthorizedError.js'
import logger from '../../service/logger.service.js'
import { User } from '../../mongodb/models/user.model.js'
import { userService } from '../../service/user.service.js'
import { Types } from 'mongoose'
import accountModel from '../../mongodb/models/account.model.js'
import { workspaceService } from '../../service/workspace.service.js'
import { organizationService } from '../../service/organization.service.js'
import BadRequestError from '../../errors/BadRequestError.js'
import { Workspace } from '../../mongodb/models/workspace.model.js'
import { OrganizationCode } from '../../mongodb/models/organizationCode.model.js'

export async function createAccount(
  identifier: Types.ObjectId,
  userId: Types.ObjectId,
  workspaces: Types.ObjectId[]
) {
  const account = await accountModel.create({
    identifier,
    user: userId,
    workspaces,
  })

  return account
}

export async function updateAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {}

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

export async function joinExistingOrganization(
  organizationCode: OrganizationCode
): Promise<Workspace | null> {
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

export async function joinNewOrganization(name: string) {
  const organization = await organizationService.addOrganization(name)
  const workspace = await workspaceService.addWorkspace(organization._id, [
    'Manager',
  ])

  return workspace
}
