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

export async function joinToExistingOrganization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { identifier, organizationCode } = req.body
  const organization = await organizationService.getOrganization(
    organizationCode
  )

  if (!organization) {
    return next(
      new BadRequestError('Organization not found', organizationCode.toString())
    )
  }

  const workspace = await workspaceService.getWorkspace(organization._id, [
    'Employee',
  ])

  if (workspace) {
    // const account = await accountService.updateAccount(identifier, workspace._id)
  }

  const newWorkspace = await workspaceService.addWorkspace(organization._id, [
    'Employee',
  ])

  // Continue here add workspace to account
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
