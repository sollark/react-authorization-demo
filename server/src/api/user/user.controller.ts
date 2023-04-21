import { NextFunction, Request, Response } from 'express'
import { userService } from './user.service.js'

export async function addUser(req: Request, res: Response, next: NextFunction) {
  const { email, role, name, lastname } = req.body

  const user = await userService.addUser(email, lastname, role, name)

  res.status(201).json(user)
}
