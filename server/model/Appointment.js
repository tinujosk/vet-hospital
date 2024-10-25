import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model('Counter', CounterSchema);
const AppointmentSchema = new Schema({
  appointmentId: { type: String, unique: true },
  doctorId: { type: String, required: true },
  appointmentDate: { type: String, required: true },
  timeSlot: { type: String, required: true },
  patientId: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });

AppointmentSchema.pre('save', async function (next) {
  if (!this.appointmentId) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'appointmentId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.appointmentId = `A${counter.seq}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

export default Appointment;
