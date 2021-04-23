import { AdminModel } from '../Models';

const addAdmin = async (data) => {
  const {
    firstName, lastName, email, password, phoneNumber, isAdmin,
  } = data;
  const admin = new AdminModel({
    firstName, lastName, email, password, phoneNumber, isAdmin,
  });
  return admin;
};

const findAdminByEmail = async (email) => AdminModel.findOne({ email });

export {
  addAdmin,
  findAdminByEmail,
};
