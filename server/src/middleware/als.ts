import { NextFunction, Request, Response } from 'express'
import { asyncLocalStorage } from '../service/als.service.js'

async function setupAsyncLocalStorage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const storage = {}
  asyncLocalStorage.run(storage, async () => {
    if (!req.userData) return next()

    const alsStore = asyncLocalStorage.getStore()
    if (!alsStore) return next()

    alsStore.userData = req.userData

    next()
  })
}

export default setupAsyncLocalStorage
