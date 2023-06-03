import { NextFunction, Request, Response } from 'express'
import { config } from '../config/config.js'
import CustomError from '../errors/CustomError.js'
import loggerService from '../service/logger.service.js'
import InternalServerError from '../errors/InternalServerError.js'

function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('errorHandler middleware')

  if (config.env === 'development') {
    console.log(error.stack)
  }

  loggerService.error(error.message)

  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      errors: error.serializeErrors(),
    })
  }

  // unknown error 500
  const internalServerError = new InternalServerError('Internal Server Error')
  return res.status(internalServerError.statusCode).json({
    errors: internalServerError.serializeErrors(),
  })
}

export default errorHandler
