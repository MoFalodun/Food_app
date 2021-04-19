const mongoose = require('mongoose');

const { Schema } = mongoose;

const customerCartSchema = new Schema({
    userId : {
        type: String,
    },
    itemId: {
        type: String,
    },
    foodName : {
        type: String,
        required: true,
    },
    // description : {
    //     type: String,
    //     required: true,
    // },
    unitPrice : {
        type: Number,
        required: true,
    },
    currency : {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
        default: 1
    },
    quantity : {
        type: Number,
        required: true,
        default: 1
    },

},
{timestamps: true}
)

const CartModel = mongoose.model('cart', customerCartSchema);

module.exports = CartModel;