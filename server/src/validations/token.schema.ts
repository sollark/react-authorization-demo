import { body } from 'express-validator'

export const tokenSchema = [
  body('refreshToken')
    .exists()
    .withMessage('Token is required')
    .bail()
    .isJWT()
    .withMessage('Token is not valid'),
]
