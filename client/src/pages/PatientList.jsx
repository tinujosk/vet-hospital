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
import { getPatients, updatePatient } from '../services/patient';
import PatientDetails from '../components/PatientDetails';

function PatientPage() {
  const [patients, setPatients] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const tableHeaders = [
    'Patient Name',
    'Species',
    'Age',
    'Owner Name',
    'Owner Phone',
  ];

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

  const handleRowClick = patient => {
    setSelectedPatient(patient);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedPatient(null);
  };

  const handleUpdatePatient = async updatedPatient => {
    try {
      await updatePatient(updatedPatient._id, updatedPatient);
      const updatedPatients = await getPatients();
      setPatients(updatedPatients);
    } catch (error) {
      console.error('Failed to update patient:', error);
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

      <TableContainer
        component={Paper}
        sx={{ maxWidth: { lg: '60%', md: '90%', sm: '100%' }, maxHeight: 500 }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {tableHeaders.map(header => (
                <TableCell>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map(patient => (
              <TableRow
                key={patient._id}
                hover
                onClick={() => handleRowClick(patient)}
              >
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.species}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>
                  {`${patient.owner.firstName} ${patient.owner.lastName}`}
                </TableCell>
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
