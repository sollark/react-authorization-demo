import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError.js'
import { authService } from './auth.service.js'

export async function getAccess(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { refreshToken: currentRefreshToken } = req.cookies

  const response = await authService.getAccess(currentRefreshToken)

  if (!response)
    return res.status(200).json({ message: 'User is not singed in' })

  const {
    account,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  } = response

  // save refresh token in cookie for 30 days
  res.cookie('refreshToken', newRefreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })

  res.status(200).json({ account, accessToken: newAccessToken })
}

export async function registration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const credentials = req.body
  const { account, accessToken, refreshToken } = await authService.registration(
    credentials
  )

  // save refresh token in cookie for 30 days
  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })

  // send account and access token to the client
  res.status(200).json({ account, accessToken })
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  const credentials = req.body

  const { account, accessToken, refreshToken } = await authService.signIn(
    credentials
  )

  // save refresh token in cookie for 30 days
  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })

  // send account and access token to the client
  res.status(200).json({ account, accessToken })
}

export async function signOut(req: Request, res: Response, next: NextFunction) {
  const { refreshToken } = req.cookies

  const result = await authService.signOut(refreshToken)

  if (result?.deletedCount > 0)
    res.clearCookie('refreshToken').status(200).json({ message: 'success' })
  else throw new BadRequestError('No refresh token found')
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  const { refreshToken: expiredRefreshToken } = req.cookies

  const {
    account,
    accessToken,
    refreshToken: newRefreshToken,
  } = await authService.refresh(expiredRefreshToken)

  // save refresh token in cookie for 30 days
  res.cookie('refreshToken', newRefreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })

  res.status(200).json({ account, accessToken })
}
