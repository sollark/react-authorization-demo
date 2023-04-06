import express from 'express'
import { login, signup, refresh, logout } from './auth.controller.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/refresh', refresh)
router.put('/logout', logout)

export { router as authRoutes }
