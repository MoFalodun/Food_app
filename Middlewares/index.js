const {
  validateSignup,
  loginSignup,
  checkIfUserEmailExists,
  checkIfUserExists,
} = require("./customer");
const {
  validateAdminSignup,
  validateLoginAdmin,
  checkIfAdminExists,
} = require("./admin");

const { validateFoodProperties, findFoodById, findFoodItemById } = require("./food")

const { validateCartAddition } = require('./cart')

const { authenticate, adminAccessValidator } = require("./auth")

module.exports = {
  validateSignup,
  loginSignup,
  checkIfUserEmailExists,
  checkIfUserExists,
  validateAdminSignup,
  validateLoginAdmin,
  checkIfAdminExists,
  validateFoodProperties,
  authenticate, adminAccessValidator,
  findFoodById,
  findFoodItemById,
  validateCartAddition
};
