import { NextFunction, Request, Response } from 'express'
import { getIdentifierFromALS } from '../../service/als.service.js'

export async function addEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const identifier = getIdentifierFromALS()
  const profile = req.body

  console.log('addEmployee, profile: ', profile)

  res.status(200).json({ message: 'addEmployee' })
}
