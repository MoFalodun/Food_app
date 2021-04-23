import { Router } from 'express';

import {
  adminAccessValidator, validateFoodProperties, findFoodById, checkIfFoodExists,
} from '../Middlewares';
import { addNewFood, getAllFood, deleteFoodById } from '../Controllers';

const foodRouter = Router();

foodRouter.post('/food', adminAccessValidator, validateFoodProperties, checkIfFoodExists, addNewFood);
foodRouter.get('/food', getAllFood);
foodRouter.delete('/food/:id', adminAccessValidator, findFoodById, deleteFoodById);

export default foodRouter;
