const { CartModel, OrderModel} = require('../Models');

const addtoCart = async (data) => {
    const { userId, itemId, foodName, unitPrice, currency, price, quantity} = data;
    const cart = new CartModel({ userId, itemId, foodName, unitPrice, currency, price, quantity })
    return cart;
}
const moveToOrder = async (data) => {
    const { userId, itemId, foodName, unitPrice, currency, price, quantity, reference} = data;
    const cart = new OrderModel({ userId, itemId, foodName, unitPrice, currency, price, quantity, reference })
    return cart;
}
// const findAllFoods = async () => FoodModel.find()

// const deleteSingleFood = async (id) => FoodModel.findByIdAndDelete(id)


const findSingleUserCart = async () => CartModel.find()

module.exports = {
    addtoCart,
    findSingleUserCart,
    moveToOrder
}