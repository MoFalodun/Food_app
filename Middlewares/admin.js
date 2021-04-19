const { adminSignupSchema, adminLoginSchema } = require('../Validations')
const { findAdminByEmail } = require('../Services')

const validateAdminSignup = (req, res, next) => {
    try {
        const { error } = adminSignupSchema.validate(req.body);
        if (!error) {
            return next();
        }
        return res.status(400).json({ status: 'fail', message: error.message });
      } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
    }
};

const validateLoginAdmin = (req, res, next) => {
    try {
        const { error } = adminLoginSchema.validate(req.body);
        if (!error) {
            return next();
        }
        return res.status(400).json({ status: 'fail', message: error.message });
      } catch (error) {
        console.log(error)
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
      console.log(error)
      return res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
    }
};

module.exports = {
    validateAdminSignup,
    validateLoginAdmin,
    checkIfAdminExists,
}