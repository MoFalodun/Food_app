import { adminLoginSchema } from '../Validations';

import { findAdminByEmail } from '../Services';

const validateLoginAdmin = (req, res, next) => {
  try {
    const { error } = adminLoginSchema.validate(req.body);
    if (!error) {
      return next();
    }
    return res.status(400).json({ status: 'fail', message: error.message });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

const checkIfAdminExists = async (req, res, next) => {
  try {
    const adminMail = await findAdminByEmail(req.body.email);
    if (adminMail) {
      return next();
    }
    return res.status(404).json({ status: 'fail', message: 'Invalid login details.' });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

export {
  validateLoginAdmin,
  checkIfAdminExists,
};
