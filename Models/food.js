import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const foodSchema = new Schema({
  id: {
    type: Schema.ObjectId,
  },
  foodName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  // quantity : {
  //     type: Number,
  //     required: true,
  // },

},
{ timestamps: true });

const FoodModel = model('food', foodSchema);

export default FoodModel;
