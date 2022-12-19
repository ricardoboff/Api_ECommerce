// Valida se os dados recebidos são validos, conforme critérios.

import { body, param } from 'express-validator';

export const brandValidations = [
  body('name').notEmpty().withMessage('Name is required!'),
];

export const brandIdValidation = [
  param('id').notEmpty().isInt({min: 0}).withMessage('Id is required!')
];

export const editBrandValidations = [...brandIdValidation, ...brandValidations];