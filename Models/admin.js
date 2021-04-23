import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema({
  id: {
    type: Schema.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  // lastName : {
  //     type: String,
  //     required: true,
  // },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // phoneNumber : {
  //     type: String,
  //     required: true,
  // },
  password: {
    type: String,
    required: true,
  },
  isAdmin: Boolean,

},
{ timestamps: true });

const AdminModel = model('admin', adminSchema);

export default AdminModel;
