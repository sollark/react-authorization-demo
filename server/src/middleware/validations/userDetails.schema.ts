import { body } from 'express-validator'

export const userDetailsSchema = [
  body('firstName')
    .exists()
    .withMessage('Name is required')
    .bail()
    .isString()
    .withMessage('Name must be a valid text'),
  body('lastname')
    .exists()
    .withMessage('Lastname is required')
    .bail()
    .isString()
    .withMessage('Lastname must be a valid text'),
  body('email')
    .exists()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email is not valid'),
  body('phone')
    .exists()
    .withMessage('Phone is required')
    .bail()
    .isMobilePhone('he-IL'),
  // body('role')
  //   .exists()
  //   .withMessage('Role is required')
  //   .bail()
  //   .isObject()
  //   .withMessage('Role must be an object'),
]
