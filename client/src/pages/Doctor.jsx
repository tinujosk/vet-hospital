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
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import PatientDetails from '../components/PatientDetails';
import { getAppointments } from '../services/appointment';
import Loading from '../components/Loading';
import { getPatientById } from '../services/patient';
import Search from '../components/Search';

function DoctorPage() {
  const [appointments, setAppointments] = useState([]);
  const [appointmentsFiltered, setAppointmentsFiltered] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  // Styled component to highlight matched text
  const HighlightedTableCell = styled(TableCell)(
    ({ theme, isHighlighted }) => ({
      backgroundColor: isHighlighted ? '#e6e4b7' : 'inherit',
      fontWeight: isHighlighted ? 'bold' : 'normal',
    })
  );

  const highlightText = text => {
    return (
      text.toString().toLowerCase().includes(searchQuery.toLowerCase()) &&
      searchQuery.toLowerCase() !== ''
    );
  };

  useEffect(() => {
    const filteredData = appointments.filter(
      row =>
        row.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.appointmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredData.length) {
      setAppointmentsFiltered(filteredData);
    } else {
      setAppointmentsFiltered(appointments);
    }
  }, [searchQuery]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = appointmentsFiltered.slice(
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
        setAppointmentsFiltered(appointmentData);
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
          <Search
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
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
                    <HighlightedTableCell
                      isHighlighted={highlightText(row.appointmentId)}
                    >
                      {row.appointmentId}
                    </HighlightedTableCell>
                    <TableCell>
                      {new Date(row.appointmentDate).toLocaleString()}
                    </TableCell>
                    <HighlightedTableCell
                      isHighlighted={highlightText(row.patient?.name)}
                    >
                      {row.patient?.name}
                    </HighlightedTableCell>
                    <TableCell>{row.timeSlot}</TableCell>
                    <TableCell>{row.reason}</TableCell>
                    <TableCell>
                      {new Date(row.createdAt).toLocaleString()}
                    </TableCell>
                    <HighlightedTableCell
                      isHighlighted={highlightText(row.status)}
                    >
                      {row.status}
                    </HighlightedTableCell>
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
            count={appointmentsFiltered.length}
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
