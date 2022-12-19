import { Router } from 'express';
import { validationsMiddleware } from '@middlewares/validations';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from '@controllers/product';

import { productValidations, editProductValidations, productIdValidation } from '@validators/product';

const productRoutes = Router();

productRoutes.get('/', listProducts);
productRoutes.get('/:id', getProduct);
productRoutes.post('/', productValidations, validationsMiddleware, createProduct);
productRoutes.put('/:id', editProductValidations, validationsMiddleware, updateProduct);
productRoutes.delete('/:id', productIdValidation, validationsMiddleware, deleteProduct);

export default productRoutes;