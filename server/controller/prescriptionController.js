import Prescription from '../model/Prescription.js';
import Appointment from '../model/Appointment.js';

export const createPrescription = async (req, res) => {
  try {
    const { appointment, medications, medicalCondition, notes,labTests } = req.body;
    const newPrescription = new Prescription({
      medications,
      labTests,
      notes,
      medicalCondition,
    });
    const savedPrescription = await newPrescription.save();

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointment,
      { prescription: savedPrescription._id, status: 'Diagnosed' },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
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
