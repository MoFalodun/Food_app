import { FoodModel } from '../Models';

const addFood = async (data) => {
  const {
    foodName, description, price, currency,
  } = data;
  const food = new FoodModel({
    foodName, description, price, currency,
  });
  return food;
};

const findAllFoods = async () => FoodModel.find().sort({ createdAt: -1 });

const deleteSingleFood = async (id) => FoodModel.findByIdAndDelete(id);

const findSingleFood = async (id) => FoodModel.findById(id);

export {
  addFood,
  findAllFoods,
  deleteSingleFood,
  findSingleFood,
};
