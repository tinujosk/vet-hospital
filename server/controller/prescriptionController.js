import Prescription from '../model/Prescription.js';
import Appointment from '../model/Appointment.js';
import { processPayment } from './paymentController.js';

export const createPrescription = async (req, res) => {
  try {
    const { appointment, medications, medicalCondition, notes, labTestBill } =
      req.body;

    const newPrescription = new Prescription({
      medications,
      notes,
      medicalCondition,
    });
    const savedPrescription = await newPrescription.save();

    // calculate medicine total.
    const medicationsTotal = medications.reduce(
      (total, medicine) => total + medicine.price,
      0
    );

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointment,
      {
        prescription: savedPrescription._id,
        status: 'Diagnosed',
      },
      { new: true }
    ).populate({
      path: 'patient',
      populate: { path: 'owner' },
    });

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const paymentDetails = {
      appointment,
      labTestBill: labTestBill || 0,
      medicineBill: medicationsTotal || 0,
      totalBill: (labTestBill || 0) + (medicationsTotal || 0),
      email: updatedAppointment.patient?.owner?.email,
      customerName: updatedAppointment.patient?.owner?.firstName,
    };

    // send the payment link
    processPayment(paymentDetails);

    return res.status(201).json(savedPrescription);
  } catch (error) {
    console.error('Error creating prescription:', error);
    return res
      .status(500)
      .json({ message: 'Failed to create prescription', error: error.message });
  }
};

export const getPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findOne({
      appointment: req.params.id,
    });
    if (!prescription)
      return res.status(404).json({ message: 'Prescription not found' });
    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
