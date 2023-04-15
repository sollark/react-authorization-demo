import { NextFunction, Request, Response } from 'express'
import UnauthorizedError from '../errors/UnauthorizedError.js'
import { ITokenPayload, tokenService } from '../service/token.service.js'

async function authHandler(req: Request, res: Response, next: NextFunction) {
  try {
    // check if authorization header is present
    const authorizationKey = req.headers.authorization
    if (!authorizationKey) {
      return next(
        new UnauthorizedError('You are not authorized to access this resource')
      )
    }

    // access token is sent in the authorization header
    const accessToken = authorizationKey.split(' ')[1]
    if (!accessToken) {
      return next(
        new UnauthorizedError('You are not authorized to access this resource')
      )
    }

    // validate access token
    const userData = await tokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next(
        new UnauthorizedError('You are not authorized to access this resource')
      )
    }

    req.userData = userData as ITokenPayload

    next()
  } catch (error) {
    return next(
      new UnauthorizedError('You are not authorized to access this resource')
    )
  }
}

export default authHandler
