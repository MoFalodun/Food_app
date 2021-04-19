const { FoodModel } = require('../Models');

const addFood = async (data) => {
    const { foodName, description, price, currency} = data;
    const food = new FoodModel({ foodName, description, price, currency })
    return food;
}

const findAllFoods = async () => FoodModel.find()

const deleteSingleFood = async (id) => FoodModel.findByIdAndDelete(id)


const findSingleFood = async (id) => FoodModel.findById(id)

module.exports = {
    addFood,
    findAllFoods,
    deleteSingleFood,
    findSingleFood
}