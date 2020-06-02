import { Router } from 'express';

import coffeeRouter from './coffee.routes';

const routes = Router();

routes.use('/coffee', coffeeRouter);

export default routes;
