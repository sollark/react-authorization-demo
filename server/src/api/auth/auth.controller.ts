import { Request, Response } from 'express'

export async function login(req: Request, res: Response) {
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

export async function signup(req: Request, res: Response) {
  //   try {
  //     const credentials = req.body
  //     // Never log passwords
  //     // logger.debug(credentials)
  //     const account = await authService.signup(credentials)
  //     logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
  //     const user = await authService.login(
  //       credentials.username,
  //       credentials.password
  //     )
  //     logger.info('User signup:', user)
  //     const loginToken = authService.getLoginToken(user)
  //     res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
  //     res.json(user)
  //   } catch (err) {
  //     logger.error('Failed to signup ' + err)
  //     res.status(500).send({ err: 'Failed to signup' })
  //   }
}

export async function logout(req: Request, res: Response) {
  //   try {
  //     res.clearCookie('loginToken')
  //     res.send({ msg: 'Logged out successfully' })
  //   } catch (err) {
  //     res.status(500).send({ err: 'Failed to logout' })
  //   }
}
