import Joi from 'joi';
// const myCustomJoi = extend(require('joi-phone-number'));

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(3).max(100).required(),
  lastName: Joi.string().min(3).max(100).required(),
  // phoneNumber: myCustomJoi.string().phoneNumber().required(),
  password: Joi.string().min(7).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});

export { signupSchema, loginSchema };
