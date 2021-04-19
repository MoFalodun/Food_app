const { signupSchema, loginSchema } = require("./customer");

const { adminSignupSchema, adminLoginSchema } = require("./admin");

const { foodAdditionSchema } = require("./food")

const { quantitySchema } = require("./cart")

module.exports = {
  signupSchema,
  loginSchema,
  adminSignupSchema,
  adminLoginSchema,
  foodAdditionSchema,
  quantitySchema
};
