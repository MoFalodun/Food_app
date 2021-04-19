const { quantitySchema } = require('../Validations')

const validateCartAddition = (req, res, next) => {
    try {
      const { error } = quantitySchema.validate(req.body);
      if (!error) {
        return next();
      }
      return res.status(400).json({ status: "fail", message: error.message });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: "fail", message: "Something went wrong." });
    }
};

module.exports = {
    validateCartAddition
}
