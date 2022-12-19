// Valida se os dados recebidos são validos, conforme critérios.

import { body, param } from 'express-validator';

export const purchaseValidations = [
  body('userId').notEmpty().withMessage('UserId is required!'),
  body('items').notEmpty().withMessage('Items is required!'),
];

export const purchaseIdValidation = [
  param('id').notEmpty().withMessage('Id is required!'),
];

export const editPurchaseValidations = [...purchaseIdValidation, ...purchaseValidations];