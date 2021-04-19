const Joi = require('joi');

const quantitySchema = Joi.object({
    quantity: Joi.number().positive().precision(2),
});

module.exports = {
    quantitySchema
}