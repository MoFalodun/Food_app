import Joi from 'joi';

const foodAdditionSchema = Joi.object({
  foodName: Joi.string().required(),
  description: Joi.string().min(3).max(100).required(),
  price: Joi.number().positive().precision(2).required(),
  currency: Joi.string().required(),
});

export default foodAdditionSchema;
