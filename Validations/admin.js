const Joi = require('joi');
const myCustomJoi = Joi.extend(require('joi-phone-number'));

const adminSignupSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(3).max(100).required(),
  lastName: Joi.string().min(3).max(100).required(),
  phoneNumber: myCustomJoi.string().phoneNumber().required(),
  password: Joi.string().min(7).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  isAdmin: Joi.boolean(),
});

const adminLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
  });

module.exports = {
    adminSignupSchema,
    adminLoginSchema
}