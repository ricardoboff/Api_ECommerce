// Valida se os dados recebidos são validos, conforme critérios.

import { body, param } from 'express-validator';

export const productValidations = [
  body('description').notEmpty().withMessage('Description is required!'),
  body('unitValue').notEmpty().withMessage('Unit Value is required!'),
  body('qtd').isInt({min: 0}).withMessage('The Amount is required!'),
  body('brandId').isInt({min: 0}).withMessage('Brand is required!'),
];

export const productIdValidation = [
  param('id').notEmpty().withMessage('Id is required!'),
];

export const editProductValidations = [...productIdValidation, ...productValidations];