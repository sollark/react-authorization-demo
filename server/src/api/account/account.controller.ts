import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError.js'
import { Account } from '../../mongodb/models/account.model.js'
import { Company } from '../../mongodb/models/company.model.js'
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

  const [updatedUserData, updatedWorkspaceData, updatedCompanyData] =
    accountService.sortAccountData(account)

  console.log('updateAccount, updatedUserData: ', updatedUserData)
  console.log('updateAccount, updatedWorkspaceData: ', updatedWorkspaceData)
  console.log('updateAccount, updatedCompanyData: ', updatedCompanyData)

  const updatedUser = await userService.updateUser(identifier, updatedUserData)
  const updatedWorkspace = await workspaceService.updateWorkspace(
    identifier,
    updatedWorkspaceData
  )

  const { companyName, companyCode } = updatedCompanyData as Partial<Company>

  let workspace: any = null
  if (companyCode)
    workspace = await workspaceService.joinExistingCompany(
      identifier,
      companyCode
    )

  if (companyName)
    workspace = await workspaceService.joinNewCompany(identifier, companyName)

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
