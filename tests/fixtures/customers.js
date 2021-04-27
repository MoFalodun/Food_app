import faker from 'faker';

const userPassword = '123456725@';

export const user = {
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  phoneNumber: faker.phone.phoneNumber(),
  password: userPassword,
  confirmPassword: userPassword,
};

export const userLogin = {
  email: user.email,
  password: userPassword,
};

export const errorSignup = {
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
};

export const invalidEmailLogin = {
  email: faker.phone.phoneNumber(),
  password: faker.internet.email(),
};
export const errorLogin = {
  email: faker.internet.email(),
  password: faker.internet.email(),
};
export const existingUserSignup = {
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  phoneNumber: user.phoneNumber,
  password: userPassword,
  confirmPassword: userPassword,
};
