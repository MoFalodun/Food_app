const {
  addCustomer,
  loginCustomer,
  findCustomerByEmail,
} = require("./customer");

const { addAdmin, findAdminByEmail } = require("./admin");

const {
  addFood,
  findAllFoods,
  deleteSingleFood,
  findSingleFood,
} = require("./food");

const { addtoCart, findSingleUserCart } = require("./cart")

module.exports = {
  addCustomer,
  loginCustomer,
  findCustomerByEmail,
  addAdmin,
  findAdminByEmail,
  addFood,
  findAllFoods,
  deleteSingleFood,
  findSingleFood,
  addtoCart,
  findSingleUserCart
};
