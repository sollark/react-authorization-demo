import { NextFunction, Request, Response } from 'express'
import { userService } from './user.service.js'
import { asyncLocalStorage } from '../../service/als.service.js'
import UnauthorizedError from '../../errors/UnauthorizedError.js'
import logger from '../../service/logger.service.js'
import { User } from '../../mongodb/models/user.model.js'

export async function addUser(req: Request, res: Response, next: NextFunction) {
  const { userData } = req.body
  const { email, name, lastname, organization, roles } = userData as User

  const user = await userService.addUser(
    email,
    name,
    lastname,
    organization,
    roles
  )

  res.status(201).json(user)
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  const store = asyncLocalStorage.getStore()
  const email = store?.userData?.email

  if (!email) {
    logger.warn(`user.controller - unauthenticated request to fetch user `)
    return new UnauthorizedError('unauthenticated')
  }

  const user = await userService.getUser(email)

  res.status(200).json(user)
}
