import { Schema } from 'mongoose';
import { foodAdditionSchema } from '../Validations';

import { findSingleFood, findAllFoods } from '../Services';

const validateFoodProperties = (req, res, next) => {
  try {
    const { error } = foodAdditionSchema.validate(req.body);
    if (!error) {
      return next();
    }
    return res.status(400).json({ status: 'fail', message: error.message });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'fail', message: 'Something went wrong.' });
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
      .json({ status: 'fail', message: 'Food item does not exist.' });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

const checkFoodIdParam = async (req, res, next) => {
  try {
    const { foodId } = req.params;
    if (Schema.Types.ObjectId.isValid(foodId)) {
      return next();
    }
    return res
      .status(404)
      .json({ status: 'fail', message: 'food Id is not valid.' });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

const findFoodItemById = async (req, res, next) => {
  try {
    const { foodId } = req.params;
    const singleFood = await findSingleFood(foodId);
    if (singleFood) {
      return next();
    }
    return res
      .status(404)
      .json({ status: 'fail', message: 'Food item does not exist.' });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

const checkIfFoodExists = async (req, res, next) => {
  try {
    const foodNames = await findAllFoods();
    const newFoodName = req.body.foodName;
    const findFood = foodNames.find(
      (el) => el.foodName.toLowerCase().trim() === newFoodName.toLowerCase().trim(),
    );
    if (!findFood) {
      return next();
    }
    return res
      .status(404)
      .json({ status: 'fail', message: 'food already exists.' });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'fail', message: 'Something went wrong.' });
  }
};

export {
  validateFoodProperties,
  findFoodById,
  findFoodItemById,
  checkIfFoodExists,
  checkFoodIdParam,
};
