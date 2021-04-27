import faker from 'faker';

import 'dotenv/config';

import { hashPassword } from '../../Utils';

const hashedPassword = hashPassword(process.env.ADMIN_PASSWORD);

export const admin = {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: hashedPassword,
  isAdmin: true,
};

export const adminLogin = {
  email: admin.email,
  password: process.env.ADMIN_PASSWORD,
};
export const wrongAdmin = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};
