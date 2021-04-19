const { Router } = require('express');
const cartRouter = Router();

const { authenticate, findFoodItemById,validateCartAddition} = require("../Middlewares")
const { addItemToCart, initializeTransaction } = require('../Controllers')

cartRouter.post('/addItem/:foodItemId', authenticate, findFoodItemById, validateCartAddition, addItemToCart )
cartRouter.post('/paystack/payment', authenticate, initializeTransaction)
// foodRouter.get('/foods', getAllFood)
// foodRouter.delete('/singleFood/:id', adminAccessValidator,findFoodById, deleteFoodById )

module.exports = {
    cartRouter
}