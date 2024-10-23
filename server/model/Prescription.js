import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PrescriptionSchema = Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  notes: { type: String },
  medications: [
    {
      // Array of medications
      medication: { type: mongoose.Schema.Types.ObjectId, ref: 'Medication' },
      dosage: { type: String },
      frequency: { type: String },
      duration: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Prescription = mongoose.model('Prescription', PrescriptionSchema);
export default Prescription;
