import { addCustomer, loginCustomer, findSingleUserCart } from '../Services';

import {
  hashPassword, comparePassword, addDataToToken, transporter,
} from '../Utils';

const addNewUser = async (req, res) => {
  try {
    const hashedPassword = hashPassword(req.body.password);
    const newUser = addCustomer({
      ...req.body,
      password: hashedPassword,
    });
    const user = await newUser.save();
    // delete newUser.password;
    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedInUser = await loginCustomer(email);
    if (loggedInUser && comparePassword(password, loggedInUser.password)) {
      // eslint-disable-next-line no-underscore-dangle
      const token = addDataToToken({ email, id: loggedInUser._id });
      return res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        data: { token, loggedInUser },
      });
    }
    return res
      .status(401)
      .json({ status: 'fail', message: 'Invalid login details' });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

const viewCart = async (req, res) => {
  try {
    const { id } = req.user;
    const data = await findSingleUserCart(id);
    res.status(201).json({
      status: 'success',
      message: 'Cart fetched successfully',
      data,
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

const signUpMessage = async (req, res, next) => {
  try {
    const { email, firstName } = req.body;
    await transporter.sendMail({
      from: '"Mo\'s Buka" <mzdoopey10@gmail.com>',
      to: email,
      subject: "Welcome to Mo's Buka",
      text: `<p>Dear ${firstName}, <br><br> Thank you for signing up to Mo's Buka. If you haven't tried out any of our delicious offers kindly head to our website. You maximum enjoyment is guaranteed. </p>`,
      html: `<p>Dear ${firstName}, <br><br> Thank you for signing up to Mo's Buka. If you haven't tried out any of our delicious offers kindly head to our website. You maximum enjoyment is guaranteed. </p>`, // html body
    });
    return next();
  } catch (error) {
    return error.message;
  }
};

export {
  addNewUser,
  loginUser,
  viewCart,
  signUpMessage,
};
