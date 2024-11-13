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
  TablePagination,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import PatientDetails from '../components/PatientDetails';
import { getAppointments } from '../services/appointment';
import Loading from '../components/Loading';
import { getPatientById } from '../services/patient';

function DoctorPage() {
  const [appointments, setAppointments] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = appointments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
      {appointments?.length ? (
        <>
          <Typography variant='h4' component='h2' sx={{ marginBottom: '50px' }}>
            Your Recent Appointments
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: { lg: '80%', md: '90%', sm: '100%' },
              maxHeight: 500,
            }}
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
                {paginatedRows?.map(row => (
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
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component='div'
            count={appointments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography variant='h5'>
          Looks like you don't have any appointments.
        </Typography>
      )}

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
