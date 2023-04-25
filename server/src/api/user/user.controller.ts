import { NextFunction, Request, Response } from 'express'
import { userService } from './user.service.js'

export async function addUser(req: Request, res: Response, next: NextFunction) {
  const { email, role, name, lastname } = req.body

  const user = await userService.addUser(email, lastname, role, name)

  res.status(201).json(user)
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  const user = await userService.getUser(req.body.email)

  res.status(200).json(user)
}
