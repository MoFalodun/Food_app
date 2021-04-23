import { CustomerModel } from '../Models';

const addCustomer = async (data) => {
  const {
    firstName, lastName, email, password, phoneNumber,
  } = data;
  const customer = new CustomerModel({
    firstName, lastName, email, password, phoneNumber,
  });
  return customer;
};

const loginCustomer = async (email) => CustomerModel.findOne({ email });

const findCustomerByEmail = async (email) => CustomerModel.findOne({ email });

export {
  addCustomer,
  loginCustomer,
  findCustomerByEmail,
};
