import { Router } from 'express';

import userRoutes from './users.routes';
import productRoutes from './products.routes';
import brandRoutes from './brand.routes';
import purchaseRoutes from './purchase.routes';

const routes = Router();

routes.use('/users', userRoutes);

routes.use('/product', productRoutes);

routes.use('/brand', brandRoutes);

routes.use('/purchase', purchaseRoutes)


export default routes;