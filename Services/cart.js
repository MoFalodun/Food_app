import { CartModel, OrderModel } from '../Models';

const addtoCart = async (data) => {
  const { userId, items } = data;
  return CartModel.create({ userId, items });
};

const updateCart = async (data) => {
  const { userId, foodId, quantity } = data;
  const updatedCart = await CartModel.findOneAndUpdate(
    { userId },
    { $push: { items: { foodId, quantity } } },
  );
  return updatedCart;
};

const updateCartReference = async (data) => {
  const { userId, reference } = data;
  const updatedCart = CartModel.updateOne(
    { userId },
    { $push: { reference } },
  );
  return updatedCart;
};

const deleteProcessedCart = async (reference) => CartModel.findOneAndDelete({ reference });
const moveToOrder = async (data) => {
  const {
    userId,
    foodId,
    foodName,
    unitPrice,
    currency,
    price,
    quantity,
    reference,
  } = data;
  const cart = new OrderModel({
    userId,
    foodId,
    foodName,
    unitPrice,
    currency,
    price,
    quantity,
    reference,
  });
  return cart;
};

const findUsersCart = async () => CartModel.find();
// const findAllFoods = async () => FoodModel.find()

// const deleteSingleFood = async (id) => FoodModel.findByIdAndDelete(id)

const findSingleUserCart = async (userId) => CartModel.find({ userId, status: 'pending' }).populate('items.foodId');

export {
  addtoCart,
  findSingleUserCart,
  moveToOrder,
  updateCart,
  findUsersCart,
  updateCartReference,
  deleteProcessedCart,
};
