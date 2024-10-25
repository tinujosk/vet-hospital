import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import PatientDetails from '../components/PatientDetails';
import { createPatient } from '../services/patient';
import {
  createAppointment,
  getAppointments,
  updateAppointment,
} from '../services/appointment';

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
};

function NursePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [editAppointmentModalOpen, setEditAppointmentModalOpen] =
    useState(false);

  const initialPatientState = {
    patientname: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    weight: '',
    medicalHistory: '',
    ownerfname: '',
    ownerlname: '',
    address: '',
    phone: '',
    email: '',
  };

  const initialAppointmentState = {
    appointmentId: '',
    doctorId: '',
    appointmentDate: '',
    timeSlot: '',
    patientId: '',
    reason: '',
    status: 'Pending',
  };

  const [newPatient, setNewPatient] = useState(initialPatientState);
  const [newAppointment, setNewAppointment] = useState(initialAppointmentState);
  const [editedAppointment, setEditedAppointment] = useState(
    initialAppointmentState
  );

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleRowClick = row => {
    setSelectedRow(row);
    setEditMode(true);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setEditMode(false);
  };

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    setNewPatient(initialPatientState);
  };

  const handleOpenAppointmentModal = () => {
    setAppointmentModalOpen(true);
  };

  const handleCloseAppointmentModal = () => {
    setAppointmentModalOpen(false);
    setNewAppointment(initialAppointmentState);
  };

  const handleOpenEditAppointmentModal = appointment => {
    setEditedAppointment(appointment);
    setEditAppointmentModalOpen(true);
  };

  const handleCloseEditAppointmentModal = () => {
    setEditAppointmentModalOpen(false);
    setEditedAppointment(initialAppointmentState);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleAppointmentInputChange = e => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const handleEditAppointmentInputChange = e => {
    const { name, value } = e.target;
    setEditedAppointment({ ...editedAppointment, [name]: value });
  };

  const handleSubmit = async () => {
    const requiredFields = [
      newPatient.patientname,
      newPatient.species,
      newPatient.breed,
      newPatient.age,
      newPatient.gender,
      newPatient.weight,
      newPatient.medicalHistory,
      newPatient.ownerfname,
      newPatient.ownerlname,
      newPatient.address,
      newPatient.phone,
      newPatient.email,
    ];

    const isAnyFieldEmpty = requiredFields.some(field => !field);

    if (isAnyFieldEmpty) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const createdPatient = await createPatient(newPatient);
      setCreateModalOpen(false);
      setNewPatient(initialPatientState);
    } catch (error) {
      console.error('Failed to create patient:', error);
    }
  };

  const handleAppointmentSubmit = async () => {
    const requiredFields = [
      newAppointment.doctorId,
      newAppointment.appointmentDate,
      newAppointment.timeSlot,
      newAppointment.patientId,
      newAppointment.reason,
      newAppointment.status,
    ];

    const isAnyFieldEmpty = requiredFields.some(field => !field);

    if (isAnyFieldEmpty) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const createdAppointment = await createAppointment(newAppointment);
      setAppointments(prev => [...prev, createdAppointment]);
      setAppointmentModalOpen(false);
      setNewAppointment(initialAppointmentState);
    } catch (error) {
      console.error('Failed to create appointment:', error);
    }
  };
  const handleEditAppointmentSubmit = async (id, updatedData) => {
    handleCloseEditAppointmentModal();
    try {
      // Call the update function with the correct ID
      const updatedAppointment = await updateAppointment(id, updatedData);
      setAppointments(prev =>
        prev.map(appointment =>
          appointment._id === id ? updatedAppointment : appointment
        )
      );
    } catch (error) {
      console.error('Failed to update appointment:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleOpenCreateModal}
        >
          Create Patient
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleOpenAppointmentModal}
        >
          Create Appointment
        </Button>
      </Box>

      <Typography variant='h4' component='h2' sx={{ marginBottom: '50px' }}>
        Appointments
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: '95%', marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>
                Appointment ID
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>
                Doctor ID
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>
                Appointment Date
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>
                Patient Name
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>
                Slot
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>
                Reason
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map(row => (
              <TableRow
                key={row._id}
                hover
                onClick={() => handleRowClick(row)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{row.appointmentId}</TableCell>
                <TableCell>{row.doctorId}</TableCell>
                <TableCell>
                  {new Date(row.appointmentDate).toLocaleString()}
                </TableCell>
                <TableCell>{row.patientId}</TableCell>
                <TableCell>{row.timeSlot}</TableCell>
                <TableCell>{row.reason}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={e => {
                      e.stopPropagation();
                      handleOpenEditAppointmentModal(row);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PatientDetails
        patientDetails={{ patientData, ownerData }}
        drawerOpen={drawerOpen}
        handleCloseDrawer={handleCloseDrawer}
        editMode={editMode}
      />

      {/* Create Patient Modal */}
      <Dialog open={createModalOpen} onClose={handleCloseCreateModal}>
        <DialogTitle>Create New Patient</DialogTitle>

        <DialogContent>
          <Typography>Patient Details</Typography>
          <TextField
            margin='dense'
            label='Patient Name'
            name='patientname'
            value={newPatient.patientname}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Species'
            name='species'
            value={newPatient.species}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Breed'
            name='breed'
            value={newPatient.breed}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Age'
            name='age'
            value={newPatient.age}
            onChange={handleInputChange}
            fullWidth
            required
            type='number'
          />
          <FormControl fullWidth margin='dense' required>
            <InputLabel id='gender-label'>Gender</InputLabel>
            <Select
              labelId='gender-label'
              name='gender'
              value={newPatient.gender}
              onChange={handleInputChange}
              label='Gender'
            >
              <MenuItem value='Male'>Male</MenuItem>
              <MenuItem value='Female'>Female</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin='dense'
            label='Weight'
            name='weight'
            value={newPatient.weight}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Medical History'
            name='medicalHistory'
            value={newPatient.medicalHistory}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <Typography variant='subtitle1' gutterBottom>
            Owner Details
          </Typography>
          <TextField
            margin='dense'
            label='Owner First Name'
            name='ownerfname'
            value={newPatient.ownerfname}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Owner Last Name'
            name='ownerlname'
            value={newPatient.ownerlname}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Address'
            name='address'
            value={newPatient.address}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Phone'
            name='phone'
            value={newPatient.phone}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Email'
            name='email'
            value={newPatient.email}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateModal} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Appointment Modal */}
      <Dialog open={appointmentModalOpen} onClose={handleCloseAppointmentModal}>
        <DialogTitle>Create New Appointment</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Doctor ID'
            name='doctorId'
            value={newAppointment.doctorId}
            onChange={handleAppointmentInputChange}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Appointment Date'
            type='datetime-local'
            name='appointmentDate'
            value={newAppointment.appointmentDate}
            onChange={handleAppointmentInputChange}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Time Slot'
            name='timeSlot'
            value={newAppointment.timeSlot}
            onChange={handleAppointmentInputChange}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Patient ID'
            name='patientId'
            value={newAppointment.patientId}
            onChange={handleAppointmentInputChange}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Reason'
            name='reason'
            value={newAppointment.reason}
            onChange={handleAppointmentInputChange}
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAppointmentModal} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleAppointmentSubmit} color='primary'>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editAppointmentModalOpen}
        onClose={handleCloseEditAppointmentModal}
      >
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Doctor ID'
            name='doctorId'
            value={editedAppointment.doctorId}
            onChange={handleEditAppointmentInputChange}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Appointment Date'
            type='datetime-local'
            name='appointmentDate'
            value={editedAppointment.appointmentDate}
            onChange={handleEditAppointmentInputChange}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Time Slot'
            name='timeSlot'
            value={editedAppointment.timeSlot}
            onChange={handleEditAppointmentInputChange}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Patient ID'
            name='patientId'
            value={editedAppointment.patientId}
            onChange={handleEditAppointmentInputChange}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Reason'
            name='reason'
            value={editedAppointment.reason}
            onChange={handleEditAppointmentInputChange}
            fullWidth
            required
          />
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              name='status'
              value={editedAppointment.status}
              onChange={handleEditAppointmentInputChange}
              fullWidth
              required
            >
              <MenuItem value='Pending'>Pending</MenuItem>
              <MenuItem value='Completed'>Completed</MenuItem>
              <MenuItem value='Cancelled'>Cancelled</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditAppointmentModal}>Cancel</Button>
          <Button
            onClick={() =>
              handleEditAppointmentSubmit(
                editedAppointment._id,
                editedAppointment
              )
            }
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default NursePage;
