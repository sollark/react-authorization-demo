// apiRouter.ts
import express from 'express'

import cookieParser from 'cookie-parser'
import { accountRoutes } from './api/account/account.routes'
import { authRoutes } from './api/auth/auth.routes'
import { companyRoutes } from './api/company/company.routes'
import { employeeRoutes } from './api/employee/employee.routes'
import { profileRoutes } from './api/profile/profile.routes'
import setupAsyncLocalStorage from './middleware/als'
import { deleteSensitiveData } from './middleware/deleteSensitiveData'

const router = express.Router()

router.use(cookieParser())
router.use(setupAsyncLocalStorage)
router.use(deleteSensitiveData)

router.use('/auth', authRoutes)
router.use('/account', accountRoutes)
router.use('/profile', profileRoutes)
router.use('/employee', employeeRoutes)
router.use('/company', companyRoutes)

export default router
