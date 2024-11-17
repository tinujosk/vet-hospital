import React from 'react';
import {
  createTheme,
  ThemeProvider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const theme = createTheme({
  palette: {
    background: {
      paper: '#878a8a',
      default: '#68888a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#2b2a2a',
    },
  },
});

export default function MedicationTable({
  medications,
  handleDeleteMedications,
}) {
  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table
          stickyHeader
          sx={{ maxHeight: 100 }}
          size='small'
          aria-label='a dense table'
        >
          <TableHead>
            <TableRow>
              <TableCell>Medicine</TableCell>
              <TableCell align='right'>Dosage</TableCell>
              <TableCell align='right'>Frequency</TableCell>
              <TableCell align='right'>Duration</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medications?.map((medication, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
                color='text.secondary'
              >
                <TableCell component='th' scope='row'>
                  {medication.name}
                </TableCell>
                <TableCell align='right'>{medication.dosage}</TableCell>
                <TableCell align='right'>{medication.frequency}</TableCell>
                <TableCell align='right'>{medication.duration}</TableCell>

                <TableCell>
                  <FontAwesomeIcon
                    cursor='pointer'
                    onClick={() =>
                      handleDeleteMedications(medication.medication)
                    }
                    icon={faTrash}
                    style={{ marginRight: '5px' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
