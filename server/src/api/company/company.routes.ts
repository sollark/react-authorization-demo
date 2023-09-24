import express from 'express'
import asyncHandler from '../../middleware/asyncHandler.js'
import requireAuth from '../../middleware/requireAuth.js'
import { addEmployee } from './company.controller.js'

const router = express.Router()
router.post('/addEmployee', requireAuth, asyncHandler(addEmployee))
