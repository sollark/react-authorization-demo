import { NextFunction, Request, Response } from 'express'
import { asyncLocalStorage } from '../service/als.service.js'

async function setupAsyncLocalStorage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const storage = {}
  asyncLocalStorage.run(storage, async () => {
    const userData = req.headers['x-user-email'] as string

    if (!userData) return next()

    const alsStore = asyncLocalStorage.getStore()
    if (!alsStore) return next()

    alsStore.userData = { email: userData }

    next()
  })
}

export default setupAsyncLocalStorage
