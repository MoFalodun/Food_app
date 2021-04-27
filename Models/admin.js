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
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: Boolean,

},
{ timestamps: true });

adminSchema.pre('save', async function save(next) {
  const admin = await mongoose.models.admin.findOne({
    email: this.email,
  });
  if (admin) {
    await mongoose.models.admin.findOneAndDelete({ email: this.email });
    return next();
  }
  return next();
});

const AdminModel = model('admin', adminSchema);

export default AdminModel;
