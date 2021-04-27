import faker from 'faker';

export const food = {
  foodName: faker.name.lastName(),
  description: faker.lorem.sentences(1),
  price: faker.finance.amount(),
  currency: 'NGN',
};

export const quantity = {
  quantity: faker.datatype.number(10),
};
