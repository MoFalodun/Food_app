const { addFood, findAllFoods, deleteSingleFood } = require("../Services");

const addNewFood = async (req, res) => {
  try {
    const newFood = await addFood(req.body);
    newFood.save();
    res.status(201).json({
      status: "success",
      message: "Food added successfully",
      data: newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Something went wrong." });
  }
};

const getAllFood = async (req, res) => {
  try {
    const food = await findAllFoods();
    res
      .status(200)
      .json({
        status: "success",
        message: "Foods fetched successfully",
        data: food,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Something went wrong." });
  }
};

const deleteFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFood = await deleteSingleFood(id);
    res
      .status(200)
      .json({
        status: "success",
        message: "Food deleted successfully",
        data: deletedFood,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Something went wrong." });
  }
};

module.exports = {
  addNewFood,
  getAllFood,
  deleteFoodById
};
