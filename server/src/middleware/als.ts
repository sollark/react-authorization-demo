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

  asyncLocalStorage.run(storage, async () => {
    const refreshToken = req.cookies['refreshToken']
    if (!refreshToken) return next()

    const uuid = await tokenService.getUuid(refreshToken)
    if (!uuid) return next()

    const alsStore = asyncLocalStorage.getStore()
    if (!alsStore) return next()

    alsStore.userData = { uuid }

    next()
  })
}

export default setupAsyncLocalStorage
