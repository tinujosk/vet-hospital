import mongoose from 'mongoose';
import Counter from './Counter.js';

const Schema = mongoose.Schema;

const MedicationSchema = new Schema(
  {
    medicationId: { type: String, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    dosageForm: { type: String, required: true },
    manufacturer: { type: String, required: true },
    strength: { type: String, required: true },
  },
  { timestamps: true }
);

MedicationSchema.pre('save', async function (next) {
  if (!this.medicationId) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'medicationId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.medicationId = `MED${counter.seq}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const Medication = mongoose.model('Medication', MedicationSchema);
export default Medication;