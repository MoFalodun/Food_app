import { createTransport } from 'nodemailer';

require('dotenv').config();

const password = process.env.PASS_WORD;
const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'mzdoopey10@gmail.com',
    pass: password,
  },
});

export default {
  transporter,
};
