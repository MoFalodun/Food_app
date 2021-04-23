import AdminModel from './admin';

import { hashPassword } from '../Utils';

require('dotenv').config();

const hashedPassword = hashPassword(process.env.ADMIN_PASSWORD);
const firstAdmin = {
  name: 'Admin User',
  email: 'administrator10@gmail.com',
  password: hashedPassword,
  isAdmin: true,
};
const adminUser = AdminModel.create(firstAdmin, (error) => {
  if (error) {
    throw error;
  }
});

export default adminUser;
