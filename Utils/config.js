import { createTransport } from 'nodemailer';

require('dotenv').config();

const password = process.env.PASS_WORD;
const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'mzdoopey10@gmail.com', // generated ethereal user
    pass: password, // generated ethereal password
  },
});

export default {
  transporter,
};
