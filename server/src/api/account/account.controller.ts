import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError.js'
import { Account } from '../../mongodb/models/account.model.js'
import { Company } from '../../mongodb/models/company.model.js'
import { getIdentifierFromALS } from '../../service/als.service.js'
import { profileService } from '../../service/profile.service.js'
import { workplaceService } from '../../service/workplace.service.js'
import { accountService } from './account.service.js'
import { USER_ROLE } from '../../mongodb/models/role.model.js'

// TODO updateAccount does not return workplace
export async function updateAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const identifier = getIdentifierFromALS()
  const account: Account = req.body

  console.log('updateAccount, account: ', account)

  const [updatedProfileData, updatedWorkplaceData, updatedCompanyData] =
    accountService.sortAccountData(account)

  console.log('updateAccount, updatedProfileData: ', updatedProfileData)
  console.log('updateAccount, updatedWorkplaceData: ', updatedWorkplaceData)
  console.log('updateAccount, updatedCompanyData: ', updatedCompanyData)

  const updatedProfile = await profileService.updateProfile(
    identifier,
    updatedProfileData
  )
  const updatedWorkplace = await workplaceService.updateWorkplace(
    identifier,
    updatedWorkplaceData
  )

  const { companyName, companyCode } = updatedCompanyData as Partial<Company>

  let workplace: any = null
  if (companyCode) {
    workplace = await workplaceService.joinExistingCompany(
      identifier,
      companyCode
    )

    // when joining existing company, set role to user
    await accountService.setRole(identifier, USER_ROLE.User)
  }

  if (companyName) {
    workplace = await workplaceService.joinNewCompany(identifier, companyName)

    // when joining new company, set role to manager
    await accountService.setRole(identifier, USER_ROLE.Manager)
  }

  const updatedAccount = await accountService.addWorkplace(
    identifier,
    workplace._id
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
