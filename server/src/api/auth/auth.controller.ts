import { NextFunction, Request, Response } from 'express'
import { authService } from './auth.service.js'

export async function registration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const credentials = req.body
  const userData = await authService.registration(credentials)

  // save refresh token in cookie for 30 days
  res.cookie('accessToken', userData.accessToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })

  // TODO fix this , i have no account at registration stage
  // res.json(userData.account)
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  const credentials = req.body

  const userData = await authService.signIn(credentials)

  // save refresh token in cookie for 30 days
  res.cookie('accessToken', userData.accessToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })

  res.json(userData.account)
}

export async function signOut(req: Request, res: Response, next: NextFunction) {
  const { accessToken } = req.cookies
  await authService.signOut(accessToken)

  // delete refresh token from cookie
  res.clearCookie('accessToken')
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  const { refreshToken } = req.cookies
  const userData = await authService.refresh(refreshToken)

  // save refresh token in cookie for 30 days
  res.cookie('refreshToken', userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })

  res.json(userData)
}
