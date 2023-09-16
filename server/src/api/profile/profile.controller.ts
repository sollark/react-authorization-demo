import { NextFunction, Request, Response } from 'express'
import { profileService } from './profile.service.js'

export async function createProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const profile = req.body
  const newPerson = await profileService.createProfile(profile)

  res.status(200).json({ newPerson })
}
