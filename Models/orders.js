const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
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
    reference : {
        type: String,
        default: null
    }
},{timestamps: true})

const OrderModel = mongoose.model('orders', orderSchema);

module.exports = OrderModel;