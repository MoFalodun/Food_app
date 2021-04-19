const { Router } = require('express');
const foodRouter = Router();

const { authenticate, adminAccessValidator, validateFoodProperties, findFoodById } = require("../Middlewares")
const { addNewFood, getAllFood, deleteFoodById } = require('../Controllers')

foodRouter.post('/add', adminAccessValidator, validateFoodProperties, addNewFood )
foodRouter.get('/foods', getAllFood)
foodRouter.delete('/singleFood/:id', adminAccessValidator,findFoodById, deleteFoodById )

module.exports = {
    foodRouter
}