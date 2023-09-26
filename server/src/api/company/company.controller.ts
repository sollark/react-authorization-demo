import { NextFunction, Request, Response } from 'express'
import { getIdentifierFromALS } from '../../service/als.service.js'
import { workplaceService } from '../workspace/workspace.service.js'
import { profileService } from '../profile/profile.service.js'

// TODO res structure
// {
//     "success": true,
//     "message": "User logged in successfully",
//     "data": { }
// }

export async function addEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // TODO check permissions
  const identifier = getIdentifierFromALS()

  const data = req.body
  const { profile, workplace } = data

  // create profile
  const newProfile = await profileService.createProfile(profile)

  // create workplace

  // TODO add company id to als
  // TODO add company id to als
  // TODO add company id to als
  const companyDBId = workplaceService.getCompanyDBId()

  res.status(200).json({
    success: true,
    message: 'A new employee has been added to the company.',
    data: {},
  })
}
