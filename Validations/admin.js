import Joi from 'joi';

const adminLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});

export default adminLoginSchema;
