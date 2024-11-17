import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material';
import PatientDetails from '../components/PatientDetails';
import { getAppointments } from '../services/appointment';
import Loading from '../components/Loading';
import { getPatientById } from '../services/patient';
import GenericTable from '../components/GenericTable';
import PieChart from '../components/PieChart';

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
      }}
    >
      <Typography
        variant='h2'
        component='h2'
        marginBottom={2}
        fontSize={{ xs: 20, sm: 30 }}
        display={{ xs: 'none', lg: 'block' }}
      >
        Your Recent Appointments
      </Typography>
      <Container
        maxWidth='lg'
        sx={{
          marginTop: 4,
        }}
      >
        <Box
          display='flex'
          flexDirection={{
            xs: 'column',
            sm: 'column',
            md: 'column',
            lg: 'row',
          }}
          justifyContent='center'
          gap={4}
        >
          <div style={{ textAlign: 'center' }}>
            <h2>Overview of Appointments</h2>
            <PieChart rawData={appointments} />
          </div>

          <GenericTable
            columns={columns}
            data={appointments}
            actions={['open']}
            onRowClick={row => handleRowClick(row)}
            onOpen={row => handleTreatment(row._id)}
          />
        </Box>
      </Container>
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
