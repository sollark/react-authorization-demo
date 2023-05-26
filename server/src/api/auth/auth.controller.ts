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
  res.cookie('refreshToken', userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })

  res.json(userData)
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  const credentials = req.body

  const userData = await authService.signIn(credentials)

  // save refresh token in cookie for 30 days
  res.cookie('refreshToken', userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })

  res.json(userData)
}

export async function signOut(req: Request, res: Response, next: NextFunction) {
  const { refreshToken } = req.cookies
  await authService.signOut(refreshToken)

  // delete refresh token from cookie
  res.clearCookie('refreshToken')
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
