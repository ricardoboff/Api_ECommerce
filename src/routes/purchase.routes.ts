import { Router } from 'express';
import { validationsMiddleware } from '@middlewares/validations';
import { createPurchase, getPurchase, listPurchases, deletePurchase } from '@controllers/purchase';

import { purchaseValidations, purchaseIdValidation } from '@validators/purchase';

const purchaseRoutes = Router();

purchaseRoutes.get('/', listPurchases);
purchaseRoutes.get('/:id', getPurchase);
purchaseRoutes.post('/', purchaseValidations, validationsMiddleware, createPurchase);
purchaseRoutes.delete('/:id', purchaseIdValidation, validationsMiddleware, deletePurchase);

export default purchaseRoutes;