import { NextFunction, Request, Response } from 'express'

function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode

  res.status(statusCode).json({
    message: error.message,
  })
}

export default errorHandler
