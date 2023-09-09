import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError.js'
import { Account } from '../../mongodb/models/account.model.js'
import { Company } from '../../mongodb/models/company.model.js'
import { USER_ROLE } from '../../mongodb/models/role.model.js'
import { Workplace } from '../../mongodb/models/workplace.model.js'
import { getIdentifierFromALS } from '../../service/als.service.js'
import { profileService } from '../../service/profile.service.js'
import { workplaceService } from '../../service/workspace.service.js'
import { accountService } from './account.service.js'

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

  // TODO add updateWorkplace
  if (!updatedProfile || !updatedCompanyData) {
    throw new BadRequestError('Cannot update profile')
  }

  const { companyName, companyId } = updatedCompanyData as Partial<Company>
  const { employeeId } = updatedWorkplaceData as Partial<Workplace>

  let workplace: any = null
  if (companyId && employeeId) {
    workplace = await workplaceService.joinExistingCompany(
      identifier,
      companyId,
      employeeId
    )

    // when joining existing company, set role to user
    await accountService.setRole(identifier, USER_ROLE.User)
  }

  if (companyName) {
    workplace = await workplaceService.joinNewCompany(
      updatedProfile._id,
      companyName
    )

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

export async function joinCompany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const identifier = getIdentifierFromALS()
  const { companyId, employeeId } = req.body

  const workplace = await workplaceService.joinExistingCompany(
    identifier,
    companyId,
    employeeId
  )

  const account = await accountService.getAccount(identifier)
  res.status(200).json({ account })
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
