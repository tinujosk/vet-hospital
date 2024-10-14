import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the Appointment Schema
const AppointmentSchema = new Schema({
  appointmentId: { type: String, unique: true }, // Add the appointmentId field
  doctorId: { type: String, required: true },
  appointmentDate: { type: String, required: true },
  timeSlot: { type: String, required: true },
  patientId: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Pre-save hook to generate appointmentId
AppointmentSchema.pre('save', async function (next) {
  if (!this.appointmentId) { // Only generate if the appointmentId doesn't exist
    try {
      const count = await mongoose.model('Appointment').countDocuments(); // Get the total number of appointments
      this.appointmentId = `A${count + 1}`; // Generate an appointmentId like A1, A2, etc.
    } catch (error) {
      return next(error); // Handle any error during count
    }
  }
  next();
});

// Create the model based on the schema
const Appointment = mongoose.model('Appointment', AppointmentSchema);

export default Appointment;
