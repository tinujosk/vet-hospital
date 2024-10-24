import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
  ownerId: { type: String, unique: true }, 
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  lastUpdated: { type: Date, default: new Date() }
});

// Pre-save hook to generate ownerId
OwnerSchema.pre('save', async function (next) {
  if (!this.ownerId) { 
    try {
      const count = await mongoose.model('Owner').countDocuments();
      this.ownerId = `O${count + 1}`; // 
    } catch (error) {
      return next(error); 
    }
  }
  this.lastUpdated = new Date();
  next();
});

const Owner = mongoose.model('Owner', OwnerSchema);
export default Owner;
