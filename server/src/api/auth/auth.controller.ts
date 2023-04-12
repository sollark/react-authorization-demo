import { NextFunction, Request, Response } from 'express'

import { authService } from './auth.service.js'

export async function signin(req: Request, res: Response, next: NextFunction) {
  const credentials = req.body

  const userData = await authService.signin(credentials)

  // save refresh token in cookie for 30 days
  res.cookie('refreshToken', userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })

  return res.json(userData)
}

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

  return res.json(userData)
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const loginToken = req.cookies.loginToken
  //     const user = authService.refresh(loginToken)
  //     res.json(user)
  //   } catch (err) {
  //      next(e)
  //   }
}

export async function signout(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     res.clearCookie('loginToken')
  //     res.send({ msg: 'Logged out successfully' })
  //   } catch (err) {
  //      next(e)
  //   }
}
