import { signupSchema, loginSchema } from '../Validations';

import { findCustomerByEmail } from '../Services';

const validateSignup = (req, res, next) => {
  try {
    const { error } = signupSchema.validate(req.body);
    console.log(error);
    if (!error) {
      return next();
    }
    return res.status(400).json({ status: 'fail', message: error.message });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

const loginSignup = (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (!error) {
      return next();
    }
    return res.status(400).json({ status: 'fail', message: error.message });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

const checkIfUserEmailExists = async (req, res, next) => {
  try {
    console.log('llll');
    const userMail = await findCustomerByEmail(req.body.email);
    console.log(userMail);
    if (!userMail) {
      return next();
    }
    return res.status(404).json({ status: 'fail', message: 'user already exists.' });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

const checkIfUserExists = async (req, res, next) => {
  try {
    const userMail = await findCustomerByEmail(req.body.email);
    if (userMail) {
      return next();
    }
    return res.status(404).json({ status: 'fail', message: 'user does not exist.' });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

export {
  validateSignup,
  loginSignup,
  checkIfUserEmailExists,
  checkIfUserExists,
};
