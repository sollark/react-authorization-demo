import { NextFunction, Request, Response } from 'express'
import { workplaceService } from './workspace.service.js'

export async function getAllEmployees(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const employees = await workplaceService.getAllEmployees()
  res.status(200).json({ employees })
}
