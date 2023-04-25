import { NextFunction, Request, Response } from 'express'
import { userService } from './user.service.js'
import { asyncLocalStorage } from '../../service/als.service.js'
import UnauthorizedError from '../../errors/UnauthorizedError.js'
import logger from '../../service/logger.service.js'

export async function addUser(req: Request, res: Response, next: NextFunction) {
  const { email, role, name, lastname } = req.body

  const user = await userService.addUser(email, lastname, role, name)

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
