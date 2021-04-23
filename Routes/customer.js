import { Router } from 'express';

import {
  addNewUser, loginUser, viewCart, signUpMessage,
} from '../Controllers';
import {
  validateSignup, checkIfUserEmailExists, checkIfUserExists, loginSignup, authenticate,
} from '../Middlewares';

const userRouter = Router();

userRouter.post('/signup', validateSignup, checkIfUserEmailExists, signUpMessage, addNewUser); // message should come after adding the user. Incase there is an error when sending to the database
userRouter.post('/login', loginSignup, checkIfUserExists, loginUser);
userRouter.get('/cart', authenticate, viewCart);

export default userRouter;
