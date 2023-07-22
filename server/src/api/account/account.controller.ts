import { NextFunction, Request, Response } from 'express'
import { Account } from '../../mongodb/models/account.model.js'
import { OrganizationCodeMap } from '../../mongodb/models/organizationCode.model.js'
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
    updatedWorkspaceData
  )

  const { organizationName, organizationCode } =
    updatedOrganizationData as Partial<OrganizationCodeMap>

  let workspace: any = null
  if (organizationCode)
    workspace = await workspaceService.joinExistingOrganization(
      organizationCode
    )

  if (organizationName)
    workspace = await workspaceService.joinNewOrganization(organizationName)

  let updatedAccount = await accountService.addWorkspace(
    identifier,
    workspace._id
  )

  if (updatedAccount) {
    updatedAccount = await accountService.completeAccount(updatedAccount._id)
    console.log('updateAccount, set complete updatedAccount', updatedAccount)
  }

  res.status(200).json({ account: updatedAccount })
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
