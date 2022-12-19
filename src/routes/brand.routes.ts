import { Router } from 'express';
import { validationsMiddleware } from '@middlewares/validations';
import { createBrand, deleteBrand, getBrand, listBrands, updateBrand } from '@controllers/brand';

import { brandValidations, editBrandValidations, brandIdValidation } from '@validators/brand';

const brandRoutes = Router();

brandRoutes.get('/', listBrands);
brandRoutes.get('/:id', getBrand);
brandRoutes.post('/', brandValidations, validationsMiddleware, createBrand);
brandRoutes.put('/:id', editBrandValidations, validationsMiddleware, updateBrand);
brandRoutes.delete('/:id', brandIdValidation, validationsMiddleware, deleteBrand);

export default brandRoutes;