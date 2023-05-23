import { NextFunction, Request, Response } from 'express'
import { asyncLocalStorage } from '../service/als.service.js'

async function setupAsyncLocalStorage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('setupAsyncLocalStorage')

  const storage = {}
  asyncLocalStorage.run(storage, async () => {
    const userData = req.headers['X-User-Email'] as string
    if (!userData) return next()

    const alsStore = asyncLocalStorage.getStore()
    if (!alsStore) return next()

    alsStore.userData = { identifier: userData }

    next()
  })
}

export default setupAsyncLocalStorage
