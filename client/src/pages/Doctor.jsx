import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
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
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import PatientDetails from '../components/PatientDetails';
import { getAppointments } from '../services/appointment';
import Loading from '../components/Loading';

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
  const [appointments, setAppointments] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleRowClick = row => {
    setSelectedRow(row);
    setDrawerOpen(true);
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
      {appointments.length ? (
        <>
          <Typography variant="h4" component="h2" sx={{ marginBottom: '50px' }}>
            Your Recent Appointments
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ maxWidth: '80%', maxHeight: '500px' }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    Appointment ID
                  </TableCell>
                  <TableCell>Appointment Date</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Slot</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments?.map(row => (
                  <TableRow
                    key={row.id}
                    hover
                    onClick={() => handleRowClick(row)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{row.appointmentId}</TableCell>
                    <TableCell>
                      {new Date(row.appointmentDate).toLocaleString()}
                    </TableCell>
                    <TableCell>{row.patient?.name}</TableCell>
                    <TableCell>{row.timeSlot}</TableCell>
                    <TableCell>{row.reason}</TableCell>
                    <TableCell>
                      {new Date(row.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell onClick={() => handleTreatment(row._id)}>
                      <FontAwesomeIcon
                        icon={faFolderOpen}
                        style={{ marginRight: '5px' }}
                      />
                      Open Case
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography variant="h5">
          Looks like you don't have any appointments.
        </Typography>
      )}

      <PatientDetails
        patientDetails={{
          patientData: selectedRow?.patient || patientData,
          ownerData,
        }}
        drawerOpen={drawerOpen}
        handleCloseDrawer={handleCloseDrawer}
      />
    </Box>
  );
}

export default DoctorPage;
