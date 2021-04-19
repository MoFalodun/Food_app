const { addtoCart, findSingleFood, findSingleUserCart} = require("../Services");

const { OrderModel, CartModel } = require('../Models')

const axios = require("axios");

const addItemToCart = async (req, res) => {
  try {
    const { id } = req.user;
    const userId = id;
    const { foodItemId } = req.params;
    const singleFoodItem = await findSingleFood(foodItemId);
    const itemId = singleFoodItem._id;
    const { foodName, price, currency } = singleFoodItem;
    const cummulativePrice = price * req.body.quantity|| price;
    const newItem = await addtoCart({
      userId,
      itemId,
      foodName,
      unitPrice: price,
      currency,
      price: cummulativePrice,
      ...req.body,
    });
    newItem.save();
    res.status(201).json({
      status: "success",
      message: "Item added successfully",
      data: newItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Something went wrong." });
  }
};


const initializeTransaction = async (req, res) => {
  const { email, id } = req.user;
  const allCart = await findSingleUserCart();
  const userCart = allCart.filter((item, index, array) => item.userId === id)
  await OrderModel.insertMany(userCart)
  const cartTotal = userCart.reduce((acc, val) => val.price + acc, 0)
  const params = JSON.stringify({
    email: email,
    amount: `${cartTotal * 100}`,
  });
  axios({
    hostname: "api.paystack.co",
    port: 443,
    url: "https://api.paystack.co/transaction/initialize",
    path: "/transaction/initialize",
    method: "POST",
    data: params,
    headers: {
      Authorization: `Bearer ${process.env.SECRET_KEY}`,
      "Content-Type": "application/json",
      "cache-control": "no-cache",
    },
  })
    .then((response) => {
      const ref = response.data.data.reference
      OrderModel.updateMany({userId : id}, { reference: ref})
      console.log(ref);
      // userCart.forEach(function (doc) {
      //   db.orders.insert(doc);
      //   db.carts.remove(doc);
      // })
      res.status(201).json({
        status: "success",
        message: "Please proceed to payment link",
        data: response.data.data,
      });
      // res.redirect(response.data.data.authorization_url)
    })
    .catch((error) => {
      console.log(error);
    });
}


module.exports = {
  addItemToCart,
  initializeTransaction,
};
