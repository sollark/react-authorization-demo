import { NextFunction, Request, Response } from 'express'
import CustomError from '../errors/CustomError.js'
import loggerService from '../service/logger.service.js'

function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  loggerService.error(error.message)

  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      message: error.serializeErrors(),
    })
  }

  // unexpected error
  return res.status(500).json({
    message: error.message,
  })
}

export default errorHandler
