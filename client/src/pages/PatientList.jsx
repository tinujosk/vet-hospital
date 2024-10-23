// src/pages/PatientPage.js
import React, { useState, useEffect } from 'react';
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
import { getPatients } from '../services/patientService';
import PatientDetails from '../components/PatientDetails';

function PatientPage() {
  const [patients, setPatients] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleRowClick = (patient) => {
    setSelectedPatient(patient); // Set the selected patient
    setDrawerOpen(true); // Open the drawer
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false); // Close the drawer
    setSelectedPatient(null); // Reset the selected patient
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
                key={patient._id}
                hover
                onClick={() => handleRowClick(patient)} // Open details on row click
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


      {selectedPatient && (
        <PatientDetails
          patientDetails={{
            patientData: selectedPatient,
            ownerData: selectedPatient.owner
          }}
          drawerOpen={drawerOpen}
          handleCloseDrawer={handleCloseDrawer}
        />
      )}
    </Box>
  );
}

export default PatientPage;
