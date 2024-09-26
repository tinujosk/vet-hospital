import express from 'express';
import {} from './model/db.js';
import login from './controller/login.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.json({ message: 'Vet Clinic Pro' });
});

app.get('/login', login);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
