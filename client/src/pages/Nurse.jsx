import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
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
  RadioGroup,
  Radio,
  FormControlLabel,

  Paper,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import PatientDetails from '../components/PatientDetails';
import { createPatient, getPatients } from '../services/patient';
import { createAppointment, getAppointments, updateAppointment } from '../services/appointment';
import { getOwners } from '../services/owner';

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
let ownerData = [];

function NursePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [editAppointmentModalOpen, setEditAppointmentModalOpen] = useState(false);
  const [isSameOwner, setIsSameOwner] = useState(true);
  const [ownerOptions, setOwnerOptions] = useState([]);
  const [patientMap, setPatientMap] = useState({});



  const initialPatientState = {
    patientname: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    weight: '',
    medicalHistory: '',
    ownerId: '',
    ownerfname: '',
    ownerlname: '',
    address: '',
    phone: '',
    email: '',
  };

  const initialAppointmentState = {
    appointmentId: '',
    doctorID: '',
    appointmentDate: '',
    timeSlot: '',
    patient: '',
    patientName: '',
    reason: '',
    status: 'Pending',
  };

  const [newPatient, setNewPatient] = useState(initialPatientState);
  const [newAppointment, setNewAppointment] = useState(initialAppointmentState);
  const [editedAppointment, setEditedAppointment] = useState(initialAppointmentState);
  const [patients, setPatients] = useState([]);
  const [patientOptions, setPatientOptions] = useState([]);

  {/*To fetch patients data*/}
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        const options = data.map(patient => ({
          value: patient._id,
          label: `${patient.name} (${patient.patientId})`
        }));

        setPatients(data);
        setPatientOptions(options);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };

    fetchPatients();
  }, []);

  {/*To fetch appointments data*/}
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


{/*To fetch owners data*/}
  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const data = await getOwners(); 
        ownerData = data;
        const options = data.map(owner => ({
          value: owner.ownerId, 
          label: `${owner.firstName} ${owner.lastName} (${owner.email})` 
        }));
        setOwnerOptions(options);
      } catch (error) {
        console.error('Failed to fetch owners:', error);
      }
    };

    fetchOwners();
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

  const handleOpenEditAppointmentModal = (appointment) => {
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

  {/*To create a new patient*/}
  const handleSubmit = async () => {
    const requiredFields = [
      newPatient.patientname,
      newPatient.species,
      newPatient.breed,
      newPatient.age,
      newPatient.gender,
      newPatient.weight,
      newPatient.ownerfname,
      newPatient.ownerlname,
      newPatient.address,
      newPatient.phone,
      newPatient.email,
    ];

    console.log('Required fields:', requiredFields);

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

  {/*To create a new appointment*/}
  const handleAppointmentSubmit = async () => {
    console.log('New Appointment:', newAppointment);
    const requiredFields = [
      newAppointment.doctorID,
      newAppointment.appointmentDate,
      newAppointment.timeSlot,
      newAppointment.patient,
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

  {/*To update an appointment*/}
  const handleEditAppointmentSubmit = async (id, updatedData) => {
    try {
      handleCloseEditAppointmentModal();
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
          Register Patient
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleOpenAppointmentModal}
        >
          Create Appointment
        </Button>
      </Box>

      <Typography variant='h4' component='h2' sx={{ marginTop: '1px' }}>
        Appointments
      </Typography>

      {/* Table to display appointments */}
      <TableContainer component={Paper} sx={{ maxWidth: '95%', marginTop: 3, maxHeight: 310, overflowY: 'auto' }}>
        <Table aria-label="scrollable table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff', position: 'sticky', top: 0, zIndex: 1 }}>Appointment ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff', position: 'sticky', top: 0, zIndex: 1 }}>Doctor ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff', position: 'sticky', top: 0, zIndex: 1 }}>Appointment Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff', position: 'sticky', top: 0, zIndex: 1 }}>Patient Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff', position: 'sticky', top: 0, zIndex: 1 }}>Slot</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff', position: 'sticky', top: 0, zIndex: 1 }}>Reason</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff', position: 'sticky', top: 0, zIndex: 1 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff', position: 'sticky', top: 0, zIndex: 1 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((row) => (
              <TableRow key={row._id} hover onClick={() => handleRowClick(row)} sx={{ cursor: 'pointer' }}>
                <TableCell>{row.appointmentId}</TableCell>
                <TableCell>Hard Coded Value</TableCell>
                <TableCell>{new Date(row.appointmentDate).toLocaleString()}</TableCell>
                <TableCell> {row.patient.name}</TableCell>
                <TableCell>{row.timeSlot}</TableCell>
                <TableCell>{row.reason}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <FontAwesomeIcon icon={faEdit} onClick={(e) => { e.stopPropagation(); handleOpenEditAppointmentModal(row); }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Patient Details Drawer */}
      <PatientDetails
        patientDetails={{ patientData, ownerData }}
        drawerOpen={drawerOpen}
        handleCloseDrawer={handleCloseDrawer}
        
      />

      {/* Create Patient Modal */}
      <Dialog open={createModalOpen} onClose={handleCloseCreateModal}>
        <DialogTitle>Register Patient</DialogTitle>

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

          <Typography variant='subtitle1' gutterBottom>
            Owner Details
          </Typography>

          {/* Radio buttons to select owner option */}
          <FormControl>
            <RadioGroup
              row
              value={isSameOwner ? 'same' : 'new'}
              onChange={(e) => setIsSameOwner(e.target.value === 'same')}
            >
              <FormControlLabel value="same" control={<Radio />} label="Existing Owner" />
              <FormControlLabel value="new" control={<Radio />} label="New Owner" />
            </RadioGroup>
          </FormControl>
          {isSameOwner ? (
            <div style={{ marginBottom: '25px' }}>
              <ReactSelect
                options={ownerOptions}
                onChange={(selectedOption) => {
                  console.log('Selected Option:', selectedOption);
                  const tst = ownerData.find(owner => owner.ownerId === selectedOption.value);
                  setNewPatient({
                    ...newPatient,
                    ownerId: tst.ownerId,
                    ownerfname: tst.firstName,
                    ownerlname: tst.lastName,
                    address: tst.address,
                    phone: tst.phone,
                    email: tst.email,
                  });
                }}
                placeholder="Select Owner"
                isSearchable
                required
              />
            </div>
          ) : (

            <>
              <TextField
                margin="dense"
                label="Owner First Name"
                name="ownerfname"
                value={newPatient.ownerfname}
                onChange={handleInputChange}
                fullWidth
                required
              />

              <TextField
                margin="dense"
                label="Owner Last Name"
                name="ownerlname"
                value={newPatient.ownerlname}
                onChange={handleInputChange}
                fullWidth
                required
              />
              <TextField
                margin="dense"
                label="Address"
                name="address"
                value={newPatient.address}
                onChange={handleInputChange}
                fullWidth
                required
              />


              <TextField
                margin="dense"
                label="Owner Email"
                name="email"
                value={newPatient.email}
                onChange={handleInputChange}
                fullWidth
                required
              />

              <TextField
                margin="dense"
                label="Owner Phone Number"
                name="phone"
                value={newPatient.phone}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </>
          )}
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
          <div style={{ marginBottom: '25px' }}>
            <ReactSelect
              options={patientOptions}
              onChange={(selectedOption) => {
                setNewAppointment({ ...newAppointment, patient: selectedOption.value, patientName: selectedOption.label.split(" (")[0] });
              }}
              placeholder="Select Patient"
              isSearchable
              required
              styles={{
                control: (base) => ({
                  ...base,
                  marginTop: '8px',
                  marginBottom: '8px',
                }),
                menu: (base) => ({
                  ...base,
                  maxHeight: 200,
                  overflowY: 'auto',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  zIndex: 1000,
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? 'rgba(224, 224, 224, 0.9)' : 'transparent',
                  color: state.isSelected ? '#000' : '#333',
                  padding: 10,
                }),
              }}
            />
          </div>
          <TextField
            margin='dense'
            label='Doctor ID'
            name='doctorID'
            value={newAppointment.doctor}
            onChange={handleAppointmentInputChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            type="date"
            name="appointmentDate"
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
            margin="dense"
            label="Reason"
            name="reason"
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

      {/* Edit Appointment Modal */}
      <Dialog open={editAppointmentModalOpen} onClose={handleCloseEditAppointmentModal}>
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='Doctor ID'
            name='doctorID'
            value={editedAppointment.doctor}
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
