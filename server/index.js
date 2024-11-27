import express from 'express';
import cors from 'cors';
import multer from 'multer';
import {} from './configs/db.js';
import login from './controller/loginController.js';
import {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  uploadImage,
} from './controller/patientController.js';
import {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
} from './controller/appointmentController.js';
import { getOwners } from './controller/ownerController.js';
import { getMedications } from './controller/medicationController.js';
import {
  createPrescription,
  getPrescription,
} from './controller/prescriptionController.js';
import {
  createUser,
  getUserDetails,
  getLoggedInUser,
} from './controller/userController.js';

import { getDoctors } from './controller/doctorController.js';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.post('/login', login);

// Patient routes and handlers
app.get('/patients', getPatients);
app.post('/patients', createPatient);
app.get('/patients/:id', getPatient);
app.put('/patients/:id', updatePatient);
app.post('/patients/upload-image', upload.single('image'), uploadImage);

// Appointment routes and handlers
app.get('/appointments', getAppointments);
app.post('/appointments', createAppointment);
app.get('/appointments/:id', getAppointment);
app.put('/appointments/:id', updateAppointment);

// Owner routes and handlers
app.get('/owners', getOwners);

// Medication routes and handlers
app.get('/medications/search', getMedications);

// Prescription routes and handlers
app.post('/prescriptions', createPrescription);
app.get('/prescriptions/:id', getPrescription);

// User routes and handlers
app.post('/user', createUser);
app.get('/user', getUserDetails);
app.get('/user/details', getLoggedInUser);

//Doctor routes and handlers
app.get('/doctors', getDoctors);

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
