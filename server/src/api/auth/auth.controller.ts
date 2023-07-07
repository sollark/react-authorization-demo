import { NextFunction, Request, Response } from 'express'
import { authService } from './auth.service.js'

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

  // delete refresh token from cookie
  res.clearCookie('refreshToken').status(200).json({ message: 'success' })
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  console.log('refresh controller')

  const { refreshToken } = req.cookies

  const userData = await authService.refresh(refreshToken)

  // save refresh token in cookie for 30 days
  res.cookie('refreshToken', userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })

  res.status(200).json(userData)
}
