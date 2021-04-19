const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => bcrypt.hashSync(password, salt);

const comparePassword = (plainPassword, hashedPassword) =>
  bcrypt.compareSync(plainPassword, hashedPassword);

const jwtSecret = process.env.JWT_SECRET;
const addDataToToken = (data) => jwt.sign(data, jwtSecret, { expiresIn: "1h" });
const verifyToken = (token) =>
  jwt.verify(token, jwtSecret, (err, data) => ({ err, data }));

module.exports = {
  comparePassword,
  hashPassword,
  addDataToToken,
  verifyToken,
};