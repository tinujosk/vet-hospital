import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import PatientDetails from '../components/PatientDetails';
import { getAppointments } from '../services/appointment';
import Loading from '../components/Loading';
import { getPatientById } from '../services/patient';
import GenericTable from '../components/GenericTable';

const columns = [
  { headerName: 'Appointment ID', field: 'appointmentId' },
  { headerName: 'Appointment Date', field: 'appointmentDate' },
  { headerName: 'Patient Name', field: 'patient.name' },
  { headerName: 'Slot', field: 'timeSlot' },
  { headerName: 'Reason', field: 'reason' },
  { headerName: 'Created At', field: 'createdAt' },
  { headerName: 'Status', field: 'status' },
];

function DoctorPage() {
  const [appointments, setAppointments] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleRowClick = async row => {
    setLoading(true);
    const result = await getPatientById(row?.patient?._id);
    if (result) {
      setSelectedPatient(result);
      setDrawerOpen(true);
      setLoading(false);
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentData = await getAppointments();
        setAppointments(appointmentData);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleTreatment = id => {
    navigate(`/treatment/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

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
        Your Recent Appointments
      </Typography>

      <GenericTable
        columns={columns}
        data={appointments}
        actions={['open']}
        onRowClick={row => handleRowClick(row)}
        onOpen={row => handleTreatment(row._id)}
      />

      <PatientDetails
        patientDetails={{
          patientData: selectedPatient,
          ownerData: selectedPatient?.owner,
        }}
        drawerOpen={drawerOpen}
        handleCloseDrawer={handleCloseDrawer}
      />
    </Box>
  );
}

export default DoctorPage;
