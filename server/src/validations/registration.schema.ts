import { body } from 'express-validator'

export const registrationSchema = [
  body('email').isEmail().withMessage('Email is not valid'),
  body('password')
    .isLength({ min: 8, max: 24 })
    .withMessage('Password must be between 8 and 24 characters'),
]
