import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LabReportSchema = Schema(
  {
    notes: String,
    testResults: [
      {
        testName: { type: String, required: true },
        result: { type: String, required: true },
        normalRange: { type: String },
        unit: { type: String },
      },
    ],
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  },
  { timestamps: true }
);

const LabReport = mongoose.model('LabReport', LabReportSchema);
export default LabReport;
