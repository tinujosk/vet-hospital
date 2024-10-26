import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PrescriptionSchema = Schema(
  {
    notes: String,
    medicalCondition: String,
    medications: [
      {
        medication: { type: mongoose.Schema.Types.ObjectId, ref: 'Medication' },
        name: String,
        dosage: String,
        frequency: String,
        duration: String,
      },
    ],
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  },
  { timestamps: true }
);

const Prescription = mongoose.model('Prescription', PrescriptionSchema);
export default Prescription;
