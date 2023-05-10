import { body } from 'express-validator'

export const newUserSchema = [
  body('name')
    .exists()
    .withMessage('Name is required')
    .bail()
    .isString()
    .withMessage('Name must be a string'),
  body('lastname')
    .exists()
    .withMessage('Lastname is required')
    .bail()
    .isString()
    .withMessage('Lastname must be a string'),
  body('email')
    .exists()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email is not valid'),
  body('role')
    .exists()
    .withMessage('Role is required')
    .bail()
    .isObject()
    .withMessage('Role must be an object'),
]
