import { AdminModel } from '../Models';

const findAdminByEmail = async (email) => AdminModel.findOne({ email });

export default findAdminByEmail;
