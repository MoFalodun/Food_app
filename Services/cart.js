const { CartModel, FoodModel } = require('../Models');

const addtoCart = async (data) => {
    const { userId, itemId, foodName, unitPrice, currency, price, quantity} = data;
    const cart = new CartModel({ userId, itemId, foodName, unitPrice, currency, price, quantity })
    return cart;
}

// const findAllFoods = async () => FoodModel.find()

// const deleteSingleFood = async (id) => FoodModel.findByIdAndDelete(id)


const findSingleUserCart = async (userId) => FoodModel.find().where(userId)

module.exports = {
    addtoCart,
    findSingleUserCart
}