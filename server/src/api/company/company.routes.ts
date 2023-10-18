import express from 'express'
import asyncHandler from '../../middleware/asyncHandler.js'
import requireAuth from '../../middleware/requireAuth.js'
import { addEmployee, getCompanyEmployees } from './company.controller.js'

const router = express.Router()
router.post('/addEmployee', requireAuth, asyncHandler(addEmployee))
router.get('/employees', requireAuth, asyncHandler(getCompanyEmployees))
