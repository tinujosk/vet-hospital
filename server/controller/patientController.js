import Patient from '../model/patient.js';
import Owner from '../model/owner.js';

// Create a new patient and link it to the owner
export const createPatient = async (req, res) => {
    console.log('Creating patient with data:', req.body);
    
    try {
        const { 
            patientname, 
            species, 
            breed, 
            age, 
            gender, 
            weight, 
            medicalHistory, 
            ownerfname, // Changed from owner.firstName to ownerfName
            ownerlname, // Changed from owner.lastName to ownerlName
            address, 
            phone, 
            email 
        } = req.body;

        // Check if owner exists by email
        const existingOwner = await Owner.findOne({ email });
        console.log('Existing Owner:', existingOwner);

        let ownerData;
        if (existingOwner) {
            ownerData = existingOwner; // If owner exists, link patient to this owner
            console.log('Existing Owner:', ownerData);
        } else {
            // Create new owner if doesn't exist
            ownerData = new Owner({
                firstName: ownerfname,
                lastName: ownerlname,
                address,
                phone,
                email,
            });
            await ownerData.save();
            console.log('Created Owner:', ownerData);
        }

        // Create new patient
        const newPatient = new Patient({
            name: patientname,
            species,
            breed,
            age,
            gender,
            weight,
            medicalHistory,
            owner: ownerData._id,
        });

        await newPatient.save();
        res.status(201).json(newPatient);
    } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get all patients
export const getAllPatients = async (req, res) => {
    console.log('Fetching all patients...');
    try {
        const patients = await Patient.find().populate('owner'); // Populate the owner field
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
  // Get a single patient by ID

export const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('owner'); // Populate the owner field
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.json(patient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
