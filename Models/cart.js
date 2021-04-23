import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const customerCartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    items: [
      {
        foodId: { type: Schema.Types.ObjectId, ref: 'food' },
        quantity: Number,
      },
    ],
    reference: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true },
);

const CartModel = model('cart', customerCartSchema);

export default CartModel;
