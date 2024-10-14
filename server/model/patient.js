import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the Patient Schema
const PatientSchema = new Schema({
  patientId: { type: String, unique: true }, // Add the patientId field
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  weight: { type: Number, required: true },
  medicalHistory: { type: [String], required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'Owner' },
  lastUpdated: { type: Date, default: new Date() }
});

// Pre-save hook to generate patientId
PatientSchema.pre('save', async function (next) {
  if (!this.patientId) { // Only generate if the patientId doesn't exist
    try {
      const count = await mongoose.model('Patient').countDocuments(); // Get the total number of patients
      this.patientId = `P${count + 1}`; // Generate a patientId like P1, P2, etc.
    } catch (error) {
      return next(error); // Handle any error during count
    }
  }
  this.lastUpdated = new Date();
  next();
});

const Patient = mongoose.model('Patient', PatientSchema);
export default Patient;
