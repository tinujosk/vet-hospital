import express from 'express';
import cors from 'cors';

import {} from './configs/db.js';
import login from './controller/login.js';
import {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
} from './controller/patient.js';
import {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
} from './controller/appointment.js';
import { getOwners } from './controller/owner.js';
import { getMedications } from './controller/medication.js';
import {
  createPrescription,
  getPrescription,
} from './controller/prescription.js';
import {
  createUser,
  getUserDetails
} from './controller/user.js'

import { getDoctors } from './controller/doctor.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.post('/login', login);

// Patient routes and handlers
app.get('/patients', getPatients);
app.post('/patients', createPatient);
app.get('/patients/:id', getPatient);
app.put('/patients/:id', updatePatient);

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
app.get('/user', getUserDetails)

//Doctor routes and handlers
app.get('/doctors', getDoctors);

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
