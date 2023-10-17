import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError.js'
import { getIdentifierFromALS } from '../../service/als.service.js'
import { accountService } from '../account/account.service.js'
import { companyService } from '../company/company.service.js'
import { workplaceService } from './workspace.service.js'

// TODO
// {
//     "success": true,
//     "message": "User logged in successfully",
//     "data": { }
// }

export async function getCompanyEmployees(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const identifier = getIdentifierFromALS()
  const accountRef = await accountService.getAccountRef(identifier)
  if (!accountRef.workplace) {
    throw new BadRequestError('Cannot find workplace')
  }

  const workplaceRef = await workplaceService.getWorkplaceRefById(
    accountRef.workplace
  )
  if (!workplaceRef?.company) {
    throw new BadRequestError('Cannot find company')
  }

  const companyDBId = workplaceRef.company
  const employees = await companyService.getCompanyEmployees(companyDBId)
  if (!employees) {
    throw new BadRequestError('Cannot find employees')
  }

  res.status(200).json({ employees })
}

export async function getAllEmployees(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const employees = await workplaceService.getAllEmployees()
  res.status(200).json({ employees })
}
