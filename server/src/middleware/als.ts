import { NextFunction, Request, Response } from 'express'
import {
  ALSStore,
  asyncLocalStorage,
  setUserData,
} from '../service/als.service.js'
import { tokenService } from '../service/token.service.js'

async function setupAsyncLocalStorage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  asyncLocalStorage.run(new ALSStore(), async () => {
    const accessToken = getAuthToken(req)
    if (!accessToken) return next()

    const tokenData = await validateToken(accessToken)
    if (!tokenData) return next()

    const { uuid, companyNumber, employeeNumber } = tokenData.userData
    setUserData({ uuid, companyNumber, employeeNumber })

    next()
  })
}

function getAuthToken(req: Request) {
  return req.headers.authorization?.split(' ')[1]
}

async function validateToken(token: string) {
  return await tokenService.validateAccessToken(token)
}

export default setupAsyncLocalStorage
