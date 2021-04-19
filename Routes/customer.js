const { Router } = require('express');
const userRouter = Router();

const { addNewUser, loginUser, viewCart} = require('../Controllers')
const {  validateSignup, checkIfUserEmailExists, checkIfUserExists, loginSignup, authenticate } = require('../Middlewares')

userRouter.post('/signup', validateSignup, checkIfUserEmailExists, addNewUser)
userRouter.post('/login', loginSignup, checkIfUserExists, loginUser )
userRouter.get('/cart', authenticate, viewCart)

module.exports = { userRouter }