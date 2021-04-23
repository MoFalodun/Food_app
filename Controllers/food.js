import { addFood, findAllFoods, deleteSingleFood } from '../Services';

const addNewFood = async (req, res) => {
  try {
    const newFood = await addFood(req.body);
    newFood.save();
    return res.status(201).json({
      status: 'success',
      message: 'Food added successfully',
      data: newFood,
    });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

const getAllFood = async (req, res) => {
  try {
    const food = await findAllFoods();
    return res
      .status(200)
      .json({
        status: 'success',
        message: 'Foods fetched successfully',
        data: food,
      });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

const deleteFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFood = await deleteSingleFood(id);
    return res
      .status(200)
      .json({
        status: 'success',
        message: 'Food deleted successfully',
        data: deletedFood,
      });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

export {
  addNewFood,
  getAllFood,
  deleteFoodById,
};
