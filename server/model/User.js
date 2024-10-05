import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;
// var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  role: { type: String, required: true },
  lastUpdated: { type: Date, default: new Date() },
});

UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

// UserSchema.plugin(uniqueValidator);

const User = mongoose.model('User', UserSchema);
export default User;
