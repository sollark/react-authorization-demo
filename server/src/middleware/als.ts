import { NextFunction, Request, Response } from 'express'
import { SessionData, asyncLocalStorage } from '../service/als.service.js'
import { tokenService } from '../service/token.service.js'
import logger from '../service/logger.service.js'

async function setupAsyncLocalStorage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('setupAsyncLocalStorage middleware')

  const storage = {}

  asyncLocalStorage.run(storage, async () => {
    // const refreshToken = req.cookies['refreshToken']
    // if (!refreshToken) return next()

    // const uuid = await tokenService.getUuid(refreshToken)
    // if (!uuid) return next()

    // const alsStore = asyncLocalStorage.getStore()
    // if (!alsStore) return next()

    // alsStore.userData = { uuid }

    const alsStore = asyncLocalStorage.getStore()
    if (!alsStore) return next()

    const authHeader = req.headers['authorization']
    const accessToken = authHeader && authHeader.split(' ')[1]
    if (!accessToken) return next()

    const tokenData = await tokenService.validateAccessToken(accessToken)
    if (!tokenData) return next()

    const { userData } = tokenData as SessionData
    if (!userData) return next()

    const { uuid, companyNumber, employeeNumber } = userData
    logger.info(
      `setupAsyncLocalStorage - uuid: ${uuid}, companyNumber: ${companyNumber}, employeeNumber: ${employeeNumber}`
    )

    alsStore.userData = { uuid, companyNumber, employeeNumber }

    next()
  })
}

export default setupAsyncLocalStorage
