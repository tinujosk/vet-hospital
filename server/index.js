import express from 'express';
import cors from 'cors';

import {} from './configs/db.js';
import login from './controller/login.js';
import {
  createPatient,
  getPatients,
  getPatient,
} from './controller/patient.js';
import {
  createAppointment,
  getAppointments,
  updateAppointment,
} from './controller/appointment.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.post('/login', login);

// Patient routes and handlers
app.get('/patients', getPatients);
app.post('/patients', createPatient);
app.get('/patients/:id', getPatient);

// Appointment routes and handlers
app.get('/appointments', getAppointments);
app.post('/appointments', createAppointment);
app.put('/appointments/:id', updateAppointment);

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
