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
import NoImage from '../images/noimage.png'

// Hardcoding for now
const data = [
  {
    appointment_id: 'A001',
    doctor_id: 'D001',
    patient_id: 'P001',
    appointment_date: '2024-09-25T09:30:00Z',
    time_slot: '09:30 AM',
    reason: 'Annual Checkup',
    status: 'Confirmed',
  },
  {
    appointment_id: 'A002',
    doctor_id: 'D002',
    patient_id: 'P002',
    appointment_date: '2024-09-26T11:00:00Z',
    time_slot: '11:00 AM',
    reason: 'Vaccination',
    status: 'Pending',
  },
  {
    appointment_id: 'A003',
    doctor_id: 'D001',
    patient_id: 'P003',
    appointment_date: '2024-09-27T14:00:00Z',
    time_slot: '02:00 PM',
    reason: 'Skin Allergy',
    status: 'Confirmed',
  },
  {
    appointment_id: 'A004',
    doctor_id: 'D003',
    patient_id: 'P004',
    appointment_date: '2024-09-28T16:30:00Z',
    time_slot: '04:30 PM',
    reason: 'Dental Cleaning',
    status: 'Cancelled',
  },
  {
    appointment_id: 'A005',
    doctor_id: 'D002',
    patient_id: 'P005',
    appointment_date: '2024-09-29T10:15:00Z',
    time_slot: '10:15 AM',
    reason: 'Fracture Treatment',
    status: 'Confirmed',
  },
];

// Hardcoding for now
const patientData = {
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
  lastUpdated: '2023-01-10',
};

// Hardcoding for now
const ownerData = {
  firstName: 'Tinu',
  lastName: 'Jos',
  address: 'B12, 110 Activa Avenue, Kitchener, Ontario',
  phone: '5195880153',
  email: 'josk.tinu@gmail.com',
  weight: '30kg',
  lastUpdated: '2023-01-10',
};

function DoctorPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = row => {
    setSelectedRow(row);
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
        Your Appointments
      </Typography>

      <TableContainer component={Paper} sx={{ maxWidth: '80%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Appointment ID</TableCell>
              <TableCell>Appointment Date</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Slot</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow
                key={row.id}
                hover
                onClick={() => handleRowClick(row)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{row.appointment_id}</TableCell>
                <TableCell>{row.appointment_date}</TableCell>
                <TableCell>{row.patient_id}</TableCell>
                <TableCell>{row.time_slot}</TableCell>
                <TableCell>{row.reason}</TableCell>
                <TableCell>{row.appointment_date}</TableCell>
                <TableCell>{row.status}</TableCell>
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
                  <strong>Name:</strong> {patientData.name}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>Species:</strong> {patientData.species}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>Breed:</strong> {patientData.breed}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>Age:</strong> {patientData.age} years
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>Gender:</strong> {patientData.gender}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>Weight:</strong> {patientData.weight}
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
                  {patientData.medicalHistory.map((item, index) => (
                    <li key={index}>
                      <Typography variant='body2'>{item}</Typography>
                    </li>
                  ))}
                </ul>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant='body2' color='textSecondary'>
                  <strong>Last Updated:</strong> {patientData.lastUpdated}
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
                  <strong>First Name:</strong> {ownerData.firstName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>Last Name:</strong> {ownerData.lastName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>Phone:</strong> {ownerData.phone}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1'>
                  <strong>Email:</strong> {ownerData.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body1'>
                  <strong>Address:</strong> {ownerData.address}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant='body2' color='textSecondary'>
                  <strong>Last Updated:</strong> {ownerData.lastUpdated}
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

export default DoctorPage;
