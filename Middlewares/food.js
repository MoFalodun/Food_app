const { foodAdditionSchema } = require("../Validations");

const { findSingleFood } = require("../Services");

const validateFoodProperties = (req, res, next) => {
  try {
    const { error } = foodAdditionSchema.validate(req.body);
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

const findFoodById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleFood = await findSingleFood(id);
    if (singleFood) {
      return next();
    }
    return res
      .status(404)
      .json({ status: "fail", message: "Food item does not exist." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Something went wrong." });
  }
};

const findFoodItemById = async (req, res, next) => {
    try {
      const { foodItemId } = req.params;
      const singleFood = await findSingleFood(foodItemId);
      if (singleFood) {
        return next();
      }
      return res
        .status(404)
        .json({ status: "fail", message: "Food item does not exist." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "fail", message: "Something went wrong." });
    }
  };

module.exports = {
  validateFoodProperties,
  findFoodById,
  findFoodItemById
};
