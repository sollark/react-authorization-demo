import { NextFunction, Request, Response } from 'express'

import { authService } from './auth.service.js'
import { tokenService } from '../../service/token.service.js'

export async function signin(req: Request, res: Response, next: NextFunction) {
  //   const { username, password } = req.body
  //   try {
  //     const user = await authService.login(username, password)
  //     const loginToken = authService.getLoginToken(user)
  //     logger.info('User login: ', user)
  //     res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
  //     res.json(user)
  //   } catch (err) {
  //     logger.error('Failed to Login ' + err)
  //     res.status(401).send({ err: 'Failed to Login' })
  //   }
}

export async function registration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const credentials = req.body
    const userData = await authService.registerNewUser(credentials)

    // save refresh token in cookie for 30 days
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })

    return res.json(userData)
  } catch (err) {
    // logger.error('Failed to signup ' + err)
    next(err)
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const loginToken = req.cookies.loginToken
  //     const user = authService.refresh(loginToken)
  //     res.json(user)
  //   } catch (err) {
  //     res.status(401).send({ err: 'Failed to refresh' })
  //   }
}

export async function signout(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     res.clearCookie('loginToken')
  //     res.send({ msg: 'Logged out successfully' })
  //   } catch (err) {
  //     res.status(500).send({ err: 'Failed to logout' })
  //   }
}
