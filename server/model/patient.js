import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  patientId: { type: String, unique: true }, 
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

PatientSchema.pre('save', async function (next) {
  if (!this.patientId) { 
    try {
      const count = await mongoose.model('Patient').countDocuments();
      this.patientId = `P${count + 1}`; 
    } catch (error) {
      return next(error); 
    }
  }
  this.lastUpdated = new Date();
  next();
});

const Patient = mongoose.model('Patient', PatientSchema);
export default Patient;
