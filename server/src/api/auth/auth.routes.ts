import express from 'express'
import { login, signup, logout } from './auth.controller.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.put('/logout', logout)

export { router as authRoutes }
