import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { authService } from './auth.service.js'

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

    const account = await authService.getAuthUser(credentials.email)
    if (account) throw new Error('Account already exists')
    // logger.debug(`auth.route - attempt to create new account with existing email: ` + JSON.stringify(account))

    const hashPassword = await bcrypt.hash(credentials.password, 3)
    credentials.password = hashPassword

    const newAccount = await authService.addAuthUser(credentials)
    // logger.debug(`auth.route - new account created: ` + JSON.stringify(newAccount))

    const user = await authService.signin(
      credentials.username,
      credentials.password
    )
    // logger.info('User signup:', user)
    const loginToken = authService.getLoginToken(user)
    res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
    res.json(user)
  } catch (err) {
    // logger.error('Failed to signup ' + err)
    res.status(500).send({ err: 'Failed to signup' })
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
