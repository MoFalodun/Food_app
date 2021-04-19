const { addtoCart, findSingleFood } = require("../Services");

const axios = require("axios");

const addItemToCart = async (req, res) => {
  try {
    const { id } = req.user;
    const userId = id;
    console.log(req.user);
    console.log(req.user.id);
    const { foodItemId } = req.params;
    const singleFoodItem = await findSingleFood(foodItemId);
    const itemId = singleFoodItem._id;
    const { foodName, price, currency } = singleFoodItem;
    const cummulativePrice = price * req.body.quantity;
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


const initializeTransaction = (req, res) => {
  const { email } = req.user;
  const params = JSON.stringify({
    email: email,
    amount: "20000",
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
