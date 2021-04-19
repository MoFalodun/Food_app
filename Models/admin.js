const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminSchema = new Schema({
    id : {
        type: Schema.ObjectId,
    },
    firstName : {
        type: String,
        required: true,
        unique: true,
    },
    lastName : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    phoneNumber : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    isAdmin: Boolean

},
{timestamps: true}
)

const AdminModel = mongoose.model('admin', adminSchema);

module.exports = AdminModel;