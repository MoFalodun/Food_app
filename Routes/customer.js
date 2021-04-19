const { Router } = require('express');
const userRouter = Router();

const { addNewUser, loginUser, viewCart, signUpMessage} = require('../Controllers')
const {  validateSignup, checkIfUserEmailExists, checkIfUserExists, loginSignup, authenticate } = require('../Middlewares')

userRouter.post('/signup', validateSignup, checkIfUserEmailExists, signUpMessage, addNewUser) // message should come after adding the user. Incase there is an error when sending to the database
userRouter.post('/login', loginSignup, checkIfUserExists, loginUser )
userRouter.get('/cart', authenticate, viewCart)

module.exports = { userRouter }