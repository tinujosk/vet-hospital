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
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Autocomplete,
  Container,
} from '@mui/material';
import PatientDetails from '../components/PatientDetails';
import {
  createPatient,
  getPatients,
  getPatientById,
} from '../services/patient';
import {
  createAppointment,
  getAppointments,
  updateAppointment,
} from '../services/appointment';
import { getOwners } from '../services/owner';
import { getDoctors } from '../services/doctor';
import GenericTable from '../components/GenericTable';

let ownerData = [];

const columns = [
  { headerName: 'Appointment ID', field: 'appointmentId' },
  { headerName: 'Doctor ID', field: 'doctor.staffId' },
  { headerName: 'Appointment Date', field: 'appointmentDate' },
  { headerName: 'Patient Name', field: 'patient.name' },
  { headerName: 'Slot', field: 'timeSlot' },
  { headerName: 'Reason', field: 'reason' },
  { headerName: 'Created At', field: 'createdAt' },
  { headerName: 'Status', field: 'status' },
];

function NursePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [editAppointmentModalOpen, setEditAppointmentModalOpen] =
    useState(false);
  const [isSameOwner, setIsSameOwner] = useState(true);
  const [ownerOptions, setOwnerOptions] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [errors, setErrors] = useState({});

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
  const [editedAppointment, setEditedAppointment] = useState(
    initialAppointmentState
  );
  const [patients, setPatients] = useState([]);
  const [patientOptions, setPatientOptions] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        const options = data.map(patient => ({
          value: patient._id,
          label: `${patient.name} (${patient.patientId})`,
        }));

        setPatients(data);
        setPatientOptions(options);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };

    fetchPatients();
  }, []);

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

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const data = await getOwners();
        ownerData = data;
        const options = data.map(owner => ({
          value: owner.ownerId,
          label: `${owner.firstName} ${owner.lastName} (${owner.email})`,
        }));
        setOwnerOptions(options);
      } catch (error) {
        console.error('Failed to fetch owners:', error);
      }
    };

    fetchOwners();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        const options = data.map(doctor => ({
          value: doctor._id,
          label: `${doctor.firstName} ${doctor.lastName} (ID: ${doctor.staffId})`,
        }));
        console.log('Doctor Options:', options);

        setDoctorOptions(options);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleRowClick = async row => {
    const result = await getPatientById(row?.patient?._id);
    if (result) {
      setSelectedRow(row);
      setSelectedPatient(result);
      setDrawerOpen(true);
    }
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
    setErrors({});
  };

  const handleOpenAppointmentModal = () => {
    setAppointmentModalOpen(true);
  };

  const handleCloseAppointmentModal = () => {
    setAppointmentModalOpen(false);
    setErrors({});
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

  const handleSubmit = async event => {
    event.preventDefault();
    if (Validite()) {
      try {
        const createdPatient = await createPatient(newPatient);
        setCreateModalOpen(false);
        setNewPatient(initialPatientState);
      } catch (error) {
        console.error('Failed to create patient:', error);
      }
    }
  };

  const Validite = () => {
    let tempErrors = {
      patientname: '',
      species: '',
      breed: '',
      age: '',
      weight: '',
      gender: '',
      ownerfname: '',
      ownerlname: '',
      address: '',
      phone: '',
      email: '',
    };
    let isValid = true;
    if (!newPatient.patientname) {
      tempErrors.patientname = 'Patient Name is required';
      isValid = false;
    }
    if (!newPatient.species) {
      tempErrors.species = 'Species is required';
      isValid = false;
    }
    if (!newPatient.breed) {
      tempErrors.breed = 'Breed is required';
      isValid = false;
    }
    if (!newPatient.age) {
      tempErrors.age = 'Age is required';
      isValid = false;
    }
    if (!newPatient.weight) {
      tempErrors.weight = 'Weight is required';
      isValid = false;
    }
    if (!newPatient.gender) {
      tempErrors.gender = 'Gender is required';
      isValid = false;
    }

    if (!newPatient.ownerfname) {
      tempErrors.ownerfname = 'Owner First Name is required';
      isValid = false;
    }
    if (!newPatient.ownerlname) {
      tempErrors.ownerlname = 'Owner Last Name is required';
      isValid = false;
    }
    if (!newPatient.address) {
      tempErrors.address = 'Address is required';
      isValid = false;
    }
    if (!newPatient.phone) {
      tempErrors.phone = 'Phone is required';
      isValid = false;
    }
    if (!newPatient.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    }
    setErrors(tempErrors);
    return isValid;
  };

  const handleAppointmentSubmit = async event => {
    console.log('New Appointment:', newAppointment);
    event.preventDefault();

    if (appointmentValidate()) {
      try {
        const createdAppointment = await createAppointment(newAppointment);
        setAppointments(prev => [...prev, createdAppointment]);
        setAppointmentModalOpen(false);
        setNewAppointment(initialAppointmentState);
      } catch (error) {
        console.error('Failed to create appointment:', error);
      }
    }
  };

  const appointmentValidate = () => {
    let tempErrors = {
      patient: '',
      doctorID: '',
      appointmentDate: '',
      timeSlot: '',
      reason: '',
    };
    let isValid = true;
    if (!newAppointment.patient) {
      tempErrors.patient = 'Patient is required';
      isValid = false;
    }
    if (!newAppointment.doctorID) {
      tempErrors.doctorID = 'Doctor ID is required';
      isValid = false;
    }
    if (!newAppointment.appointmentDate) {
      tempErrors.appointmentDate = 'Appointment Date is required';
      isValid = false;
    }
    if (!newAppointment.timeSlot) {
      tempErrors.timeSlot = 'Time Slot is required';
      isValid = false;
    }
    if (!newAppointment.reason) {
      tempErrors.reason = 'Reason is required';
      isValid = false;
    }
    setErrors(tempErrors);
    console.log('Errors:', errors);
    console.log('isValid:', isValid);
    return isValid;
  };

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
      }}
    >
      <Container
        maxWidth='lg'
        sx={{
          marginTop: 4,
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, marginBottom: { xs: 2, sm: 4 } }}>
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

        <Typography
          variant='h2'
          component='h2'
          marginBottom={2}
          fontSize={{ xs: 20, sm: 30 }}
        >
          Appointments
        </Typography>

        <GenericTable
          columns={columns}
          data={appointments}
          actions={['edit']}
          onRowClick={row => handleRowClick(row)}
          onEdit={(row, e) => {
            e.stopPropagation();
            handleOpenEditAppointmentModal(row);
          }}
        />
      </Container>

      {/* Patient Details Drawer */}
      <PatientDetails
        patientDetails={{
          patientData: selectedPatient,
          ownerData: selectedPatient?.owner,
        }}
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
            error={errors.patientname}
            helperText={errors.patientname}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Species'
            name='species'
            value={newPatient.species}
            onChange={handleInputChange}
            error={errors.species}
            helperText={errors.species}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Breed'
            name='breed'
            value={newPatient.breed}
            onChange={handleInputChange}
            error={errors.breed}
            helperText={errors.breed}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Age'
            name='age'
            value={newPatient.age}
            onChange={handleInputChange}
            error={errors.age}
            helperText={errors.age}
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
            error={errors.weight}
            helperText={errors.weight}
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
              onChange={e => setIsSameOwner(e.target.value === 'same')}
            >
              <FormControlLabel
                value='same'
                control={<Radio />}
                label='Existing Owner'
              />
              <FormControlLabel
                value='new'
                control={<Radio />}
                label='New Owner'
              />
            </RadioGroup>
          </FormControl>
          {isSameOwner ? (
            <Autocomplete
              options={ownerOptions}
              getOptionLabel={option => option.label}
              onChange={(event, selectedOption) => {
                console.log('Selected Option:', selectedOption);
                if (selectedOption) {
                  const tst = ownerData.find(
                    owner => owner.ownerId === selectedOption.value
                  );
                  setNewPatient({
                    ...newPatient,
                    ownerId: tst.ownerId,
                    ownerfname: tst.firstName,
                    ownerlname: tst.lastName,
                    address: tst.address,
                    phone: tst.phone,
                    email: tst.email,
                  });
                }
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label='Select Owner'
                  placeholder='Select Owner'
                  required
                  margin='normal'
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
            />
          ) : (
            <>
              <TextField
                margin='dense'
                label='Owner First Name'
                name='ownerfname'
                value={newPatient.ownerfname}
                onChange={handleInputChange}
                error={errors.ownerfname}
                helperText={errors.ownerfname}
                fullWidth
                required
              />

              <TextField
                margin='dense'
                label='Owner Last Name'
                name='ownerlname'
                value={newPatient.ownerlname}
                onChange={handleInputChange}
                error={errors.ownerlname}
                helperText={errors.ownerlname}
                fullWidth
                required
              />
              <TextField
                margin='dense'
                label='Address'
                name='address'
                value={newPatient.address}
                onChange={handleInputChange}
                error={errors.address}
                helperText={errors.address}
                fullWidth
                required
              />

              <TextField
                margin='dense'
                label='Owner Email'
                name='email'
                value={newPatient.email}
                onChange={handleInputChange}
                error={errors.email}
                helperText={errors.email}
                fullWidth
                required
              />

              <TextField
                margin='dense'
                label='Owner Phone Number'
                name='phone'
                value={newPatient.phone}
                onChange={handleInputChange}
                error={errors.phone}
                helperText={errors.phone}
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
          <Autocomplete
            options={patientOptions}
            getOptionLabel={option => option.label}
            onChange={(event, selectedOption) => {
              if (selectedOption) {
                setNewAppointment({
                  ...newAppointment,
                  patient: selectedOption.value,
                  patientName: selectedOption.label.split(' (')[0],
                });
              }
            }}
            renderInput={params => (
              <TextField
                {...params}
                label='Select Patient'
                error={!!errors.patient}
                helperText={errors.patient}
                required
                placeholder='Select Patient'
                margin='normal'
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            sx={{
              '& .MuiAutocomplete-listbox': {
                maxHeight: 200,
                overflowY: 'auto',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
              '& .MuiAutocomplete-option': {
                padding: '10px',
                backgroundColor: 'transparent',
                '&[aria-selected="true"]': {
                  color: '#000',
                },
                '&:hover': {
                  backgroundColor: 'rgba(224, 224, 224, 0.9)',
                },
              },
            }}
          />
          <Autocomplete
            options={doctorOptions}
            getOptionLabel={option => option.label}
            onChange={(event, selectedOption) => {
              if (selectedOption) {
                setNewAppointment({
                  ...newAppointment,
                  doctorID: selectedOption.value,
                  doctorName: selectedOption.label.split(' (')[0],
                  doctor: selectedOption.value,
                });
              }
            }}
            renderInput={params => (
              <TextField
                {...params}
                label='Select Doctor'
                error={!!errors.doctor}
                helperText={errors.doctor}
                required
                placeholder='Select Doctor'
                margin='normal'
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            sx={{
              '& .MuiAutocomplete-listbox': {
                maxHeight: 200,
                overflowY: 'auto',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
              '& .MuiAutocomplete-option': {
                padding: '10px',
                backgroundColor: 'transparent',
                '&[aria-selected="true"]': {
                  color: '#000',
                },
                '&:hover': {
                  backgroundColor: 'rgba(224, 224, 224, 0.9)',
                },
              },
            }}
          />

          <TextField
            margin='dense'
            type='date'
            name='appointmentDate'
            value={newAppointment.appointmentDate}
            onChange={handleAppointmentInputChange}
            error={errors.appointmentDate}
            helperText={errors.appointmentDate}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Time Slot'
            name='timeSlot'
            value={newAppointment.timeSlot}
            onChange={handleAppointmentInputChange}
            error={errors.timeSlot}
            helperText={errors.timeSlot}
            fullWidth
            required
          />
          <TextField
            margin='dense'
            label='Reason'
            name='reason'
            value={newAppointment.reason}
            onChange={handleAppointmentInputChange}
            error={errors.reason}
            helperText={errors.reason}
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
      <Dialog
        open={editAppointmentModalOpen}
        onClose={handleCloseEditAppointmentModal}
      >
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={doctorOptions}
            getOptionLabel={option => option.label}
            value={
              doctorOptions.find(
                option => option.value === editedAppointment.doctorID
              ) || null
            }
            onChange={(event, selectedOption) => {
              if (selectedOption) {
                setEditedAppointment({
                  ...editedAppointment,
                  doctorID: selectedOption.value,
                  doctorName: selectedOption.label.split(' (')[0],
                  doctor: selectedOption.value,
                });
              }
            }}
            renderInput={params => (
              <TextField
                {...params}
                label='Select Doctor'
                error={!!errors.doctor}
                helperText={errors.doctor}
                required
                placeholder='Select Doctor'
                margin='normal'
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            sx={{
              '& .MuiAutocomplete-listbox': {
                maxHeight: 200,
                overflowY: 'auto',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
              '& .MuiAutocomplete-option': {
                padding: '10px',
                backgroundColor: 'transparent',
                '&[aria-selected="true"]': {
                  color: '#000',
                },
                '&:hover': {
                  backgroundColor: 'rgba(224, 224, 224, 0.9)',
                },
              },
            }}
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
              <MenuItem value='Prelims'>Prelims Done</MenuItem>
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
