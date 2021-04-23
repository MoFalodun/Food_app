import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: {
    type: String,
  },
  foodId: {
    type: String,
  },
  foodName: {
    type: String,
    required: true,
  },
  // description : {
  //     type: String,
  //     required: true,
  // },
  unitPrice: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 1,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
}, { timestamps: true });

const OrderModel = model('orders', orderSchema);

export default OrderModel;
