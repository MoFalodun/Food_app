import dotenv from 'dotenv';

import { sign, verify } from 'jsonwebtoken';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

dotenv.config();

const salt = genSaltSync(10);
const hashPassword = (password) => hashSync(password, salt);

const comparePassword = (plainPassword, hashedPassword) => {
  compareSync(plainPassword, hashedPassword);
};

const jwtSecret = process.env.JWT_SECRET;
const addDataToToken = (data) => sign(data, jwtSecret, { expiresIn: '1h' });
const verifyToken = (token) => verify(token, jwtSecret, (err, data) => ({ err, data }));

export {
  comparePassword,
  hashPassword,
  addDataToToken,
  verifyToken,
};
