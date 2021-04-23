import Joi from 'joi';

const quantitySchema = Joi.object({
  quantity: Joi.number().positive().precision(2).required(),
});

export default {
  quantitySchema,
};
