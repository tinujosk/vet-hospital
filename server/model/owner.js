import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the Owner Schema
const OwnerSchema = new Schema({
  ownerId: { type: String, unique: true }, // Add the ownerId field
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  lastUpdated: { type: Date, default: new Date() }
});

// Pre-save hook to generate ownerId
OwnerSchema.pre('save', async function (next) {
  if (!this.ownerId) { // Only generate if the ownerId doesn't exist
    try {
      const count = await mongoose.model('Owner').countDocuments(); // Get the total number of owners
      this.ownerId = `O${count + 1}`; // Generate an ownerId like O1, O2, etc.
    } catch (error) {
      return next(error); // Handle any error during count
    }
  }
  this.lastUpdated = new Date();
  next();
});

const Owner = mongoose.model('Owner', OwnerSchema);
export default Owner;
