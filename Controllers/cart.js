import axios from 'axios';
import {
  addtoCart, findSingleUserCart, updateCart,
} from '../Services';

import { CartModel } from '../Models';

const addItemToCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { foodId } = req.params;
    const { quantity } = req.body;
    const userCart = await findSingleUserCart(id);

    if (userCart.length === 0) {
      await addtoCart({
        userId: id,
        items: { foodId, quantity },
      });
    } else {
      await updateCart({
        userId: id,
        foodId,
        quantity,
      });
    }
    return res.status(201).json({
      status: 'success',
      message: 'Food added successfully',
    });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

const initializeTransaction = async (req, res) => {
  const { email, id } = req.user;
  const reference = `${id}${Date.now()}`;
  const [allCart] = await findSingleUserCart(id);
  const cartTotal = allCart.items.reduce((acc, val) => {
    const calculation = val.foodId.price * val.quantity + acc;
    return calculation;
  });
  const params = JSON.stringify({
    email,
    amount: `${cartTotal * 100}`,
    callback_url: `http://localhost:3000/verify/${reference}`,
    reference,
  });
  axios({
    hostname: 'api.paystack.co',
    port: 443,
    url: 'https://api.paystack.co/transaction/initialize',
    path: '/transaction/initialize',
    method: 'POST',
    data: params,
    headers: {
      Authorization: `Bearer ${process.env.SECRET_KEY}`,
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
    },
  })
    .then(async (response) => {
      await CartModel.findOneAndUpdate({ userId: id }, { reference: response.data.data.reference });
      // const ref = response.data.data.reference
      res.status(201).json({
        status: 'success',
        message: 'Please proceed to payment link',
        data: response.data.data,
      });
      // res.redirect(response.data.data.authorization_url)
    })
    .catch((error) => res
      .status(505)
      .json({ status: 'success', message: error.message }));
};

export {
  addItemToCart,
  initializeTransaction,
};
