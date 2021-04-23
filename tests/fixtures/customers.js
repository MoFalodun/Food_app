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
