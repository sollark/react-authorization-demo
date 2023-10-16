import { NextFunction, Request, Response } from 'express'
import { asyncLocalStorage } from '../service/als.service.js'
import { tokenService } from '../service/token.service.js'

async function setupAsyncLocalStorage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('setupAsyncLocalStorage middleware')

  const storage = {}

  // TODO change refresh token to access token and take it from header
  // TODO separate refresh token from als data
  asyncLocalStorage.run(storage, async () => {
    const authorizationHeader = req.headers['authorization']
    if (!authorizationHeader) return next()
    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) return next()

    ////////////////////////
    const refreshToken = req.cookies['refreshToken']
    if (!refreshToken) return next()

    const identifier = await tokenService.getIdentifier(refreshToken)
    if (!identifier) return next()

    const alsStore = asyncLocalStorage.getStore()
    if (!alsStore) return next()

    alsStore.userData = { identifier }

    next()
  })
}

export default setupAsyncLocalStorage
