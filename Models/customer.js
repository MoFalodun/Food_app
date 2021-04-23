import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const customerSchema = new Schema({
  id: {
    type: Schema.ObjectId,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

},
{ timestamps: true });

const CustomerModel = model('customers', customerSchema);

export default CustomerModel;
