import { Router } from 'express';

import {
  authenticate, findFoodItemById, validateCartAddition, checkFoodIdParam,
} from '../Middlewares';
import { addItemToCart, initializeTransaction, verifyTransaction } from '../Controllers';

const cartRouter = Router();

cartRouter.post('/cart/:foodId', authenticate, checkFoodIdParam, findFoodItemById, validateCartAddition, addItemToCart);
cartRouter.post('/payment', authenticate, initializeTransaction);
cartRouter.get('/verify/:reference', verifyTransaction);
// foodRouter.get('/foods', getAllFood)
// foodRouter.delete('/singleFood/:id', adminAccessValidator,findFoodById, deleteFoodById )

export default cartRouter;
