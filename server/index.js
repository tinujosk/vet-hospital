import express from 'express';
import cors from 'cors';

import {} from './model/db.js';
import login from './controller/login.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.json({ message: 'Vet Clinic Pro' });
});

app.post('/login', login);

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
