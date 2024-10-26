import Prescription from '../model/Prescription.js';

export const createPrescription = async (req, res) => {
  try {
    const newPrescription = new Prescription(req.body);
    const savedPrescription = await newPrescription.save();
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
