import express from 'express'
import { signin, registration, refresh, signout } from './auth.controller.js'

const router = express.Router()

router.post('/register', registration)
router.post('/signin', signin)
router.get('/refresh', refresh)
router.put('/signout', signout)

export { router as authRoutes }
