import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Drawer,
  Button,
  Typography,
  Grid,
  Divider,
} from '@mui/material';
import NoImage from '../images/noimage.png';

// Hardcoding patient data for now
const patients = [
  {
    id: 'P001',
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 5,
    gender: 'Male',
    weight: '30kg',
    medicalHistory: [
      'Vaccinated for Rabies',
      'Previous surgery on left leg',
      'Allergy to peanuts',
    ],
    owner: {
      firstName: 'Tinu',
      lastName: 'Jos',
      phone: '5195880153',
      email: 'josk.tinu@gmail.com',
      address: 'B12, 110 Activa Avenue, Kitchener, Ontario',
      lastUpdated: '2023-01-10',
    },
  },
  {
    id: 'P002',
    name: 'Bella',
    species: 'Cat',
    breed: 'Siamese',
    age: 3,
    gender: 'Female',
    weight: '10kg',
    medicalHistory: [
      'Vaccinated for Feline Leukemia',
      'No known allergies',
    ],
    owner: {
      firstName: 'Sarah',
      lastName: 'Smith',
      phone: '5191234567',
      email: 'sarah.smith@gmail.com',
      address: '123 Elm St, Kitchener, Ontario',
      lastUpdated: '2023-01-10',
    },
  },
  {
    id: 'P003',
    name: 'Rocky',
    species: 'Dog',
    breed: 'Labrador',
    age: 2,
    gender: 'Male',
    weight: '25kg',
    medicalHistory: [
      'Vaccinated for Rabies',
      'No previous surgeries',
    ],
    owner: {
      firstName: 'David',
      lastName: 'Brown',
      phone: '5199876543',
      email: 'david.brown@gmail.com',
      address: '456 Maple Ave, Kitchener, Ontario',
      lastUpdated: '2023-01-10',
    },
  },
  // Add more patient data as needed
];

function PatientPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleRowClick = (patient) => {
    setSelectedPatient(patient);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
      }}
    >
      <Typography variant='h4' component='h2' sx={{ marginBottom: '50px' }}>
        Patients List
      </Typography>

      <TableContainer component={Paper} sx={{ maxWidth: '80%' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Patient Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Species</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Age</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Owner Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Owner Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow
                key={patient.id}
                hover
                onClick={() => handleRowClick(patient)}
                sx={{ cursor: 'pointer', '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
              >
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.species}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{`${patient.owner.firstName} ${patient.owner.lastName}`}</TableCell>
                <TableCell>{patient.owner.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Drawer anchor='right' open={drawerOpen} onClose={handleCloseDrawer}>
        <Box sx={{ width: 500, padding: 3 }}>
          <Typography variant='h5' component='h2' gutterBottom sx={{ mb: 4 }}>
            Patient Details
          </Typography>
          <Box
            component='img'
            sx={{
              width: '100%',
            }}
            alt='Patient Image'
            src={NoImage}
          />
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 6 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>Name:</strong> {selectedPatient?.name}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>Species:</strong> {selectedPatient?.species}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>Breed:</strong> {selectedPatient?.breed}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>Age:</strong> {selectedPatient?.age} years
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>Gender:</strong> {selectedPatient?.gender}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>Weight:</strong> {selectedPatient?.weight}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='h6' component='h3' gutterBottom>
                  Medical History:
                </Typography>
                <ul>
                  {selectedPatient?.medicalHistory.map((item, index) => (
                    <li key={index}>
                      <Typography variant='body2'>{item}</Typography>
                    </li>
                  ))}
                </ul>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant='body2' color='textSecondary'>
                  <strong>Last Updated:</strong> {selectedPatient?.owner.lastUpdated}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Typography variant='h5' component='h2' gutterBottom sx={{ mb: 4 }}>
            Owner Details
          </Typography>
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>First Name:</strong> {selectedPatient?.owner.firstName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>Last Name:</strong> {selectedPatient?.owner.lastName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>Phone:</strong> {selectedPatient?.owner.phone}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>Email:</strong> {selectedPatient?.owner.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body1'>
                  <strong>Address:</strong> {selectedPatient?.owner.address}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant='body2' color='textSecondary'>
                  <strong>Last Updated:</strong> {selectedPatient?.owner.lastUpdated}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Button
            variant='contained'
            color='primary'
            onClick={handleCloseDrawer}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Close
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}

export default PatientPage;
