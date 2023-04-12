import { NextFunction, Request, Response } from 'express'

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(400).send(error.message)
}
