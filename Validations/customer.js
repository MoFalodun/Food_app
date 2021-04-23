import Joi from 'joi';

import myCustomJoi from 'joi-phone-number';

const myCustomPhoneValidator = Joi.extend(myCustomJoi);

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(3).max(100).required(),
  lastName: Joi.string().min(3).max(100).required(),
  phoneNumber: myCustomPhoneValidator.string().phoneNumber().required(),
  password: Joi.string().min(7).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});

export { signupSchema, loginSchema };
