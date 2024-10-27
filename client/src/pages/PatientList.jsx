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
import { getPatients,updatePatient } from '../services/patient';

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
    setSelectedPatient(patient);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedPatient(null);
  };
  const handleUpdatePatient = async (updatedPatient) => {
    try {
        await updatePatient(updatedPatient._id, updatedPatient);
        const updatedPatients = await getPatients();
        setPatients(updatedPatients);
    } catch (error) {
        console.error("Failed to update patient:", error);
    }
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

      <TableContainer component={Paper} sx={{ maxWidth: '85%', marginTop: 3, maxHeight: 310, overflowY: 'auto' }}>
        <Table  aria-label="scrollable table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#1976d2' }}>Patient Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#1976d2' }}>Species</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#1976d2' }}>Age</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#1976d2' }}>Owner Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#1976d2' }}>Owner Phone</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map(patient => (
              <TableRow
                key={patient._id}
                hover
                onClick={() => handleRowClick(patient)}
                sx={{
                  cursor: 'pointer',
                  '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                }}
              >
                <TableCell onClick={() => handleRowClick(patient)}>{patient.name}</TableCell>
                <TableCell onClick={() => handleRowClick(patient)}>{patient.species}</TableCell>
                <TableCell onClick={() => handleRowClick(patient)}>{patient.age}</TableCell>
                <TableCell onClick={() => handleRowClick(patient)}>
                  {`${patient.owner.firstName} ${patient.owner.lastName}`}
                </TableCell>
                <TableCell onClick={() => handleRowClick(patient)}>{patient.owner.phone}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedPatient && (
        <PatientDetails
          patientDetails={{
            patientData: selectedPatient,
            ownerData: selectedPatient.owner,
          }}
          drawerOpen={drawerOpen}
          handleCloseDrawer={handleCloseDrawer}
          handleUpdatePatient={handleUpdatePatient}
          editMode={true}
        />
      )}
    </Box>
  );
}

export default PatientPage;
