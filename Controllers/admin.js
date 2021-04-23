import axios from 'axios';
import {
  findAdminByEmail,
} from '../Services';

import { comparePassword, addDataToToken } from '../Utils';

import { CartModel } from '../Models';

const logAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedInAdmin = await findAdminByEmail(email);
    if (loggedInAdmin && comparePassword(password, loggedInAdmin.password)) {
      // delete loggedInAdmin.password; not working...
      const token = addDataToToken({ email, id: loggedInAdmin.id, isAdmin: loggedInAdmin.isAdmin });
      return res.status(200).json({
        status: 'success',
        message: 'Admin logged in successfully',
        data: { token, loggedInAdmin },
      });
    }
    return res
      .status(401)
      .json({ status: 'fail', message: 'Invalid login details' });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

const verifyTransaction = async (req, res) => {
  // const { email, id } = req.user;
  const { reference } = req.params;
  try {
    // const orderReference = userCart[0].reference
    const response = await axios({
      hostname: 'api.paystack.co',
      port: 443,
      url: `https://api.paystack.co/transaction/verify/${reference}`,
      path: `/transaction/verify/${reference}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.SECRET_KEY}`,
      },
    });
    if (response.data.data.status === 'success') {
      await CartModel.findOneAndUpdate({ reference }, { status: 'processed' });
    } else {
      return res
        .status(404)
        .json({ status: 'fail', message: 'cart not found' });
    }
    return res
      .status(201)
      .json({ status: 'success', message: 'cart updated successfully' });
  } catch (error) {
    return res
      .status(505)
      .json({ status: 'fail', message: 'something went wrong' });
  }
};

export {
  logAdmin,
  verifyTransaction,
};
