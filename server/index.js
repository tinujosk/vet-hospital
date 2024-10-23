import express from 'express';
import cors from 'cors';

import {} from './model/db.js';
import login from './controller/login.js';
import { createPatient,getAllPatients,getPatientById} from './controller/patientController.js';
import { createAppointment,getAppointments } from './controller/AppointmentController.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.json({ message: 'Vet Clinic Pro' });
});

app.post('/login', login);



app.post('/createpatient', createPatient);

app.get('/patients', getAllPatients);
app.get('/patients/:id', getPatientById);

app.post('/createappointments', createAppointment);
app.get('/nurse', getAppointments);

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
