import React, { useState, useEffect } from 'react';
import { Box, TableCell, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getPatients, updatePatient } from '../services/patient';
import PatientDetails from '../components/PatientDetails';
import GenericTable from '../components/GenericTable';

const columns = [
  { headerName: 'Patient Name', field: 'name' },
  { headerName: 'Species', field: 'species' },
  { headerName: 'Age', field: 'age' },
  { headerName: 'Owner First Name', field: 'owner.firstName' },
  { headerName: 'Owner Last Name', field: 'owner.lastName' },
  { headerName: 'Owner Phone', field: 'owner.phone' },
];

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

      <GenericTable
        columns={columns}
        data={patients}
        onRowClick={row => handleRowClick(row)}
      />

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
