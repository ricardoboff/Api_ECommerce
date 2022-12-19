// Valida se os dados recebidos são validos, conforme critérios.

import { body, param } from 'express-validator';

export const userValidations = [
  body('name').notEmpty().withMessage('Name is required!'),
  body('email').notEmpty().withMessage('E-mail is required').isEmail().withMessage('E-mail is invalid!'),
  body('password').notEmpty().withMessage('Password is required!'),
  body('address').notEmpty().withMessage('Address is required!'),
  body('city').notEmpty().withMessage('City is required!'),
  body('uf').notEmpty().withMessage('UF is required!'),
];

export const userIdValidation = [
  param('id').notEmpty().withMessage('Id is required!'),
];

export const editUserValidations = [...userIdValidation, ...userValidations];