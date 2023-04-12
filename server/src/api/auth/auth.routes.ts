import express from 'express'
import { body } from 'express-validator'
import { signin, registration, refresh, signout } from './auth.controller.js'

const router = express.Router()

router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 24 }),
  registration
)
router.post('/signin', signin)
router.get('/refresh', refresh)
router.put('/signout', signout)

export { router as authRoutes }
