const { addNewUser, loginUser, viewCart } = require("./customer");

const { addNewAdmin, logAdmin } = require("./admin");

const { addNewFood, getAllFood, deleteFoodById} = require("./food")

const { addItemToCart, initializeTransaction } = require('./cart')

module.exports = {
  addNewUser,
  loginUser,
  addNewAdmin,
  logAdmin,
  addNewFood,
  getAllFood,
  deleteFoodById,
  addItemToCart,
  viewCart,
  initializeTransaction
};
