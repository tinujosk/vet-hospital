import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import NoImage from '../images/noimage.png';
import CloseIcon from '@mui/icons-material/Close';

// Hardcoded data for appointments
const initialData = [
  {
    appointment_id: 'A001',
    doctor_id: 'D001',
    patient_id: 'P001',
    patient: {
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
      image: '', // Placeholder for patient image
      lastUpdated: '2024-09-25', // Add last updated for patient
    },
    owner: {
      firstName: 'Tinu',
      lastName: 'Jos',
      address: 'B12, 110 Activa Avenue, Kitchener, Ontario',
      phone: '5195880153',
      email: 'josk.tinu@gmail.com',
      lastUpdated: '2024-09-25', // Add last updated for owner
    },
    appointment_date: '2024-09-25T09:30:00Z',
    time_slot: '09:30 AM',
    reason: 'Annual Checkup',
    status: 'Confirmed',
  },
];

function Nursedashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [appointments, setAppointments] = useState(initialData);

  const [modalOpen, setModalOpen] = useState(false);
  const [patientModalOpen, setPatientModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [newAppointment, setNewAppointment] = useState({
    appointment_id: '',
    doctor_id: '',
    patient_id: '',
    appointment_date: '',
    time_slot: '',
    reason: '',
    status: '',
  });
  const [newPatient, setNewPatient] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    weight: '',
    medicalHistory: [],
    image: null,
    owner: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
    },
  });

  const handleRowClick = row => {
    setSelectedRow(row);
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => setDrawerOpen(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleEditModalOpen = () => {
    handleCloseDrawer();
    setSelectedRow(null);
    setDrawerOpen(false);
    setEditMode(true);
  };
  const handleEditModalClose = () => setEditMode(false);

  const handlePatientModalOpen = () => setPatientModalOpen(true);
  const handlePatientModalClose = () => setPatientModalOpen(false);

  const handleAppointmentChange = (field, value) => {
    setNewAppointment(prev => ({ ...prev, [field]: value }));
  };

  const handlePatientChange = (field, value) => {
    if (field === 'image') {
      setNewPatient(prev => ({ ...prev, image: value }));
    } else if (field.includes('.')) {
      const [ownerField, ownerKey] = field.split('.');
      setNewPatient(prev => ({
        ...prev,
        [ownerField]: {
          ...prev[ownerField],
          [ownerKey]: value,
        },
      }));
    } else {
      setNewPatient(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleAddAppointment = () => {
    // Form validation
    if (
      !newAppointment.patient_id ||
      !newAppointment.doctor_id ||
      !newAppointment.appointment_date ||
      !newAppointment.time_slot ||
      !newAppointment.reason ||
      !newAppointment.status
    ) {
      alert('Please fill all appointment fields!');
      return;
    }

    const newData = {};

    setAppointments(prev => [...prev, newData]);
    handleModalClose();
    resetForms();
  };

  const handleAddPatient = () => {
    // Form validation
    if (
      !newPatient.name ||
      !newPatient.species ||
      !newPatient.breed ||
      !newPatient.age ||
      !newPatient.gender ||
      !newPatient.weight ||
      !newPatient.owner.firstName ||
      !newPatient.owner.lastName ||
      !newPatient.owner.phone ||
      !newPatient.owner.email ||
      !newPatient.owner.address
    ) {
      alert('Please fill all patient fields!');
      return;
    }

    console.log('New Patient Added:', newPatient);
    handlePatientModalClose();
    resetPatientForms();
  };

  const resetForms = () => {
    setNewAppointment({
      appointment_id: '',
      doctor_id: '',
      patient_id: '',
      appointment_date: '',
      time_slot: '',
      reason: '',
      status: '',
    });
  };

  const resetPatientForms = () => {
    setNewPatient({
      name: '',
      species: '',
      breed: '',
      age: '',
      gender: '',
      weight: '',
      medicalHistory: [],
      image: null,
      owner: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
      },
    });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant='h4' component='h2' sx={{ marginBottom: '20px' }}>
        Nurse Dashboard
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item>
          <Button variant='contained' color='primary' onClick={handleModalOpen}>
            Create Appointment
          </Button>
          <Button
            variant='contained'
            color='secondary'
            sx={{ marginLeft: 2 }}
            onClick={handlePatientModalOpen}
          >
            Create Patient
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Appointment ID</TableCell>
              <TableCell>Appointment Date</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Slot</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map(row => (
              <TableRow
                key={row.appointment_id}
                hover
                onClick={() => handleRowClick(row)}
              >
                <TableCell>{row.appointment_id}</TableCell>
                <TableCell>
                  {new Date(row.appointment_date).toLocaleString()}
                </TableCell>
                <TableCell>{row.patient.name}</TableCell>
                <TableCell>{row.time_slot}</TableCell>
                <TableCell>{row.reason}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={e => {
                      e.stopPropagation(); // Prevent row click when button is clicked
                      handleEditModalOpen(row);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Patient Detail Drawer */}
      <Drawer anchor='right' open={drawerOpen} onClose={handleCloseDrawer}>
        {selectedRow && (
          <Box sx={{ width: 500, padding: 3 }}>
            <AppBar position='static'>
              <Toolbar>
                <IconButton
                  edge='start'
                  color='inherit'
                  onClick={() => setSelectedRow(null)}
                  aria-label='close'
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant='h6' sx={{ flexGrow: 1 }}>
                  Patient Details
                </Typography>
              </Toolbar>
            </AppBar>
            <Box
              component='img'
              sx={{
                width: '100%',
              }}
              alt='Patient Image'
              src={NoImage}
            />
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant='body1'>
                    <strong>Species:</strong> {selectedRow.patient.species}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body1'>
                    <strong>Breed:</strong> {selectedRow.patient.breed}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body1'>
                    <strong>Age:</strong> {selectedRow.patient.age}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body1'>
                    <strong>Gender:</strong> {selectedRow.patient.gender}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body1'>
                    <strong>Weight:</strong> {selectedRow.patient.weight}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body1'>
                    <strong>Last Updated:</strong>{' '}
                    {selectedRow.patient.lastUpdated}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body1'>
                    <strong>Medical History:</strong>{' '}
                    {selectedRow.patient.medicalHistory.join(', ')}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant='h6' gutterBottom>
                Owner Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant='body1'>
                    <strong>First Name:</strong> {selectedRow.owner.firstName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body1'>
                    <strong>Last Name:</strong> {selectedRow.owner.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body1'>
                    <strong>Phone:</strong> {selectedRow.owner.phone}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body1'>
                    <strong>Email:</strong> {selectedRow.owner.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body1'>
                    <strong>Address:</strong> {selectedRow.owner.address}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        )}
      </Drawer>

      {/* Add Appointment Modal */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            width: 400,
            margin: 'auto',
            marginTop: '20px',
            padding: 4,
            backgroundColor: 'white',
            borderRadius: 2,
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <Typography variant='h6' component='h2' sx={{ marginBottom: 2 }}>
            Add Appointment
          </Typography>
          <TextField
            label='Appointment ID'
            fullWidth
            required
            value={newAppointment.appointment_id}
            onChange={e =>
              handleAppointmentChange('appointment_id', e.target.value)
            }
            sx={{ marginBottom: 2 }}
            error={!newAppointment.appointment_id}
            helperText={
              !newAppointment.appointment_id ? 'Appointment ID is required' : ''
            }
          />
          <TextField
            label='Doctor ID'
            fullWidth
            required
            value={newAppointment.doctor_id}
            onChange={e => handleAppointmentChange('doctor_id', e.target.value)}
            sx={{ marginBottom: 2 }}
            error={!newAppointment.doctor_id}
            helperText={
              !newAppointment.doctor_id ? 'Doctor ID is required' : ''
            }
          />
          <TextField
            label='Patient ID'
            fullWidth
            required
            value={newAppointment.patient_id}
            onChange={e =>
              handleAppointmentChange('patient_id', e.target.value)
            }
            sx={{ marginBottom: 2 }}
            error={!newAppointment.patient_id}
            helperText={
              !newAppointment.patient_id ? 'Patient ID is required' : ''
            }
          />
          <TextField
            type='datetime-local'
            fullWidth
            required
            value={newAppointment.appointment_date}
            onChange={e =>
              handleAppointmentChange('appointment_date', e.target.value)
            }
            sx={{ marginBottom: 2 }}
            error={!newAppointment.appointment_date}
            helperText={
              !newAppointment.appointment_date
                ? 'Appointment date is required'
                : ''
            }
          />
          <TextField
            label='Time Slot'
            fullWidth
            required
            value={newAppointment.time_slot}
            onChange={e => handleAppointmentChange('time_slot', e.target.value)}
            sx={{ marginBottom: 2 }}
            error={!newAppointment.time_slot}
            helperText={
              !newAppointment.time_slot ? 'Time slot is required' : ''
            }
          />
          <TextField
            label='Reason'
            fullWidth
            required
            value={newAppointment.reason}
            onChange={e => handleAppointmentChange('reason', e.target.value)}
            sx={{ marginBottom: 2 }}
            error={!newAppointment.reason}
            helperText={!newAppointment.reason ? 'Reason is required' : ''}
          />
          <TextField
            label='Status'
            fullWidth
            required
            value={newAppointment.status}
            onChange={e => handleAppointmentChange('status', e.target.value)}
            sx={{ marginBottom: 2 }}
            error={!newAppointment.status}
            helperText={!newAppointment.status ? 'Status is required' : ''}
          />
          <Button
            variant='contained'
            onClick={handleAddAppointment}
            sx={{ marginTop: 2 }}
          >
            Add Appointment
          </Button>
        </Box>
      </Modal>

      {/* Add Patient Modal */}
      <Modal open={patientModalOpen} onClose={handlePatientModalClose}>
        <Box
          sx={{
            width: 600,
            margin: 'auto',
            marginTop: '20px',
            marginBottom: '20px',
            padding: 4,
            backgroundColor: 'white',
            borderRadius: 2,
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <Typography variant='h5' component='h2' sx={{ marginBottom: 2 }}>
            Add Patient
          </Typography>
          <Typography variant='h6' component='h5' sx={{ marginBottom: 2 }}>
            Patient Details
          </Typography>
          <TextField
            label='Patient Name'
            fullWidth
            required
            value={newPatient.name}
            onChange={e => handlePatientChange('name', e.target.value)}
            sx={{ marginBottom: 2 }}
            error={!newPatient.name}
            helperText={!newPatient.name ? 'Patient name is required' : ''}
          />
          <TextField
            label='Species'
            fullWidth
            required
            value={newPatient.species}
            onChange={e => handlePatientChange('species', e.target.value)}
            sx={{ marginBottom: 2 }}
            error={!newPatient.species}
            helperText={!newPatient.species ? 'Species is required' : ''}
          />
          <TextField
            label='Breed'
            fullWidth
            required
            value={newPatient.breed}
            onChange={e => handlePatientChange('breed', e.target.value)}
            sx={{ marginBottom: 2 }}
            error={!newPatient.breed}
            helperText={!newPatient.breed ? 'Breed is required' : ''}
          />
          <TextField
            label='Age'
            fullWidth
            required
            type='number'
            value={newPatient.age}
            onChange={e => handlePatientChange('age', e.target.value)}
            sx={{ marginBottom: 2 }}
            error={!newPatient.age}
            helperText={!newPatient.age ? 'Age is required' : ''}
          />
          <TextField
            label='Gender'
            fullWidth
            required
            value={newPatient.gender}
            onChange={e => handlePatientChange('gender', e.target.value)}
            sx={{ marginBottom: 2 }}
            error={!newPatient.gender}
            helperText={!newPatient.gender ? 'Gender is required' : ''}
          />
          <TextField
            label='Weight'
            fullWidth
            required
            type='number'
            value={newPatient.weight}
            onChange={e => handlePatientChange('weight', e.target.value)}
            sx={{ marginBottom: 2 }}
            error={!newPatient.weight}
            helperText={!newPatient.weight ? 'Weight is required' : ''}
          />
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Medical History'
              multiline
              rows={4}
              value={newPatient.medicalHistory.join('\n')}
              onChange={e =>
                handlePatientChange(
                  'medicalHistory',
                  e.target.value.split('\n')
                )
              }
              sx={{ marginBottom: 2 }}
              error={!newPatient.medicalHistory.length}
              helperText={
                !newPatient.medicalHistory.length
                  ? 'Medical history is required'
                  : ''
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              fullWidth
              type='file'
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => handlePatientChange('image', e.target.files[0])}
              label='Upload Patient Image'
            />
          </Grid>

          <Typography
            variant='h6'
            component='h5'
            sx={{ marginBottom: 2, marginTop: 2 }}
          >
            Owner Details
          </Typography>
          <TextField
            label='Owner First Name'
            fullWidth
            required
            value={newPatient.owner.firstName}
            onChange={e =>
              handlePatientChange('owner.firstName', e.target.value)
            }
            sx={{ marginBottom: 2 }}
            error={!newPatient.owner.firstName}
            helperText={
              !newPatient.owner.firstName ? 'Owner first name is required' : ''
            }
          />
          <TextField
            label='Owner Last Name'
            fullWidth
            required
            value={newPatient.owner.lastName}
            onChange={e =>
              handlePatientChange('owner.lastName', e.target.value)
            }
            sx={{ marginBottom: 2 }}
            error={!newPatient.owner.lastName}
            helperText={
              !newPatient.owner.lastName ? 'Owner last name is required' : ''
            }
          />
          <TextField
            label='Owner Phone'
            fullWidth
            required
            type='number'
            value={newPatient.owner.phone}
            onChange={e => handlePatientChange('owner.phone', e.target.value)}
            sx={{ marginBottom: 2 }}
            error={!newPatient.owner.phone}
            helperText={
              !newPatient.owner.phone ? 'Phone number is required' : ''
            }
          />
          <TextField
            label='Owner Email'
            fullWidth
            required
            type='email'
            value={newPatient.owner.email}
            onChange={e => handlePatientChange('owner.email', e.target.value)}
            sx={{ marginBottom: 2 }}
            error={!newPatient.owner.email}
            helperText={!newPatient.owner.email ? 'Email is required' : ''}
          />
          <TextField
            label='Owner Address'
            fullWidth
            required
            value={newPatient.owner.address}
            onChange={e => handlePatientChange('owner.address', e.target.value)}
            sx={{ marginBottom: 2 }}
            error={!newPatient.owner.address}
            helperText={!newPatient.owner.address ? 'Address is required' : ''}
          />

          <Button
            variant='contained'
            onClick={handleAddPatient}
            sx={{ marginTop: 2 }}
          >
            Add Patient
          </Button>
        </Box>
      </Modal>

      {/* Edit Appointment Modal */}
      <Modal open={editMode} onClose={handleEditModalClose}>
        <Box
          sx={{
            width: 600,
            margin: 'auto',
            marginTop: '20px',
            marginBottom: '20px',
            padding: 4,
            backgroundColor: 'white',
            borderRadius: 2,
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <Typography variant='h6' sx={{ marginBottom: 2 }}>
            {editMode ? 'Edit Appointment' : 'Create Appointment'}
          </Typography>
          <TextField
            label='Appointment ID'
            value={newAppointment.appointment_id}
            onChange={e =>
              handleAppointmentChange('appointment_id', e.target.value)
            }
            fullWidth
            disabled={editMode}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label='Doctor ID'
            value={newAppointment.doctor_id}
            onChange={e => handleAppointmentChange('doctor_id', e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label='Patient ID'
            value={newAppointment.patient_id}
            onChange={e =>
              handleAppointmentChange('patient_id', e.target.value)
            }
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            type='datetime-local'
            value={newAppointment.appointment_date}
            onChange={e =>
              handleAppointmentChange('appointment_date', e.target.value)
            }
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label='Time Slot'
            value={newAppointment.time_slot}
            onChange={e => handleAppointmentChange('time_slot', e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label='Reason'
            value={newAppointment.reason}
            onChange={e => handleAppointmentChange('reason', e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label='Status'
            value={newAppointment.status}
            onChange={e => handleAppointmentChange('status', e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button variant='contained' color='primary'>
            {editMode ? 'Update Appointment' : 'Create Appointment'}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Nursedashboard;
