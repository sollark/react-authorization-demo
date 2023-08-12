import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError.js'
import { Account } from '../../mongodb/models/account.model.js'
import { Organization } from '../../mongodb/models/organization.model.js'
import { getIdentifierFromALS } from '../../service/als.service.js'
import { userService } from '../../service/user.service.js'
import { workspaceService } from '../../service/workspace.service.js'
import { accountService } from './account.service.js'

export async function updateAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const identifier = getIdentifierFromALS()
  const account: Account = req.body

  console.log('updateAccount account, account: ', account)

  const [updatedUserData, updatedWorkspaceData, updatedOrganizationData] =
    accountService.sortAccountData(account)

  console.log('updateAccount, updatedUserData: ', updatedUserData)
  console.log('updateAccount, updatedWorkspaceData: ', updatedWorkspaceData)
  console.log(
    'updateAccount, updatedOrganizationData: ',
    updatedOrganizationData
  )

  const updatedUser = await userService.updateUser(identifier, updatedUserData)
  const updatedWorkspace = await workspaceService.updateWorkspace(
    identifier,
    updatedWorkspaceData
  )

  console.log('updateAccount, updatedWorkspace: ', updatedWorkspace)

  const { organizationName, organizationCode } =
    updatedOrganizationData as Partial<Organization>

  let workspace: any = null
  if (organizationCode)
    workspace = await workspaceService.joinExistingOrganization(
      identifier,
      organizationCode
    )

  if (organizationName)
    workspace = await workspaceService.joinNewOrganization(
      identifier,
      organizationName
    )

  const updatedAccount = await accountService.addWorkspace(
    identifier,
    workspace._id
  )

  if (!updatedAccount) {
    throw new BadRequestError('Cannot update account')
  }

  const completedAccount = await accountService.completeAccount(
    updatedAccount._id
  )

  res.status(200).json({ account: completedAccount })
}

export async function getAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const identifier = getIdentifierFromALS()
  const account = await accountService.getAccount(identifier)

  res.status(200).json({ account })
}
