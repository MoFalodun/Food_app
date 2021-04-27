import { Router } from 'express';

import {
  authenticate, findFoodItemById, validateCartAddition,
} from '../Middlewares';
import { addItemToCart, initializeTransaction, verifyTransaction } from '../Controllers';

const cartRouter = Router();

cartRouter.post('/cart/:foodId', authenticate, findFoodItemById, validateCartAddition, addItemToCart);
cartRouter.post('/payment', authenticate, initializeTransaction);
cartRouter.get('/verify/:reference', verifyTransaction);

export default cartRouter;
