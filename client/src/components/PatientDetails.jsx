import React from 'react';
import {
  Drawer,
  Button,
  Typography,
  Grid,
  Divider,
  Box,
  Paper,
  TextField,
} from '@mui/material';

import NoImage from '../images/noimage.png';

function PatientDetails({
  patientDetails,
  drawerOpen,
  handleCloseDrawer,
  editMode,
}) {
  const { patientData, ownerData } = patientDetails;

  return (
    <Drawer anchor='right' open={drawerOpen} onClose={handleCloseDrawer}>
      <Box sx={{ width: 600, padding: 3 }}>
        <Typography variant='h5' component='h2' gutterBottom sx={{ mb: 4 }}>
          Patient Details
        </Typography>
        <Box
          component='img'
          sx={{
            width: '100%',
          }}
          alt='Patient Image'
          src={NoImage}
        />
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 6 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box display='flex' alignItems='center'>
                <Typography variant='body1' sx={{ marginRight: 1 }}>
                  <strong>Name:</strong>
                </Typography>
                <TextField
                  value={patientData.name}
                  margin='none'
                  variant='standard'
                  disabled={!editMode}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' alignItems='center'>
                <Typography variant='body1' sx={{ marginRight: 1 }}>
                  <strong>Species:</strong>
                </Typography>
                <TextField
                  value={patientData.species}
                  margin='none'
                  variant='standard'
                  disabled={!editMode}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' alignItems='center'>
                <Typography variant='body1' sx={{ marginRight: 1 }}>
                  <strong>Breed:</strong>
                </Typography>
                <TextField
                  value={patientData.breed}
                  margin='none'
                  variant='standard'
                  disabled={!editMode}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' alignItems='center'>
                <Typography variant='body1' sx={{ marginRight: 1 }}>
                  <strong>Age:</strong>
                </Typography>
                <TextField
                  value={patientData.age}
                  margin='none'
                  variant='standard'
                  disabled={!editMode}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' alignItems='center'>
                <Typography variant='body1' sx={{ marginRight: 1 }}>
                  <strong>Gender:</strong>
                </Typography>
                <TextField
                  value={patientData.gender}
                  margin='none'
                  variant='standard'
                  disabled={!editMode}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' alignItems='center'>
                <Typography variant='body1' sx={{ marginRight: 1 }}>
                  <strong>Weight:</strong>
                </Typography>
                <TextField
                  value={patientData.weight}
                  margin='none'
                  variant='standard'
                  disabled={!editMode}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h6' component='h3' gutterBottom>
                Medical History:
              </Typography>
              <ul>
                {patientData.medicalHistory.map((item, index) => (
                  <li key={index}>
                    <Typography variant='body2'>{item}</Typography>
                  </li>
                ))}
              </ul>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ marginY: 2 }} />
              <Box display='flex' alignItems='center'>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  flexBasis={'50%'}
                >
                  <strong>Last Updated:</strong> {patientData.lastUpdated}
                </Typography>
                {editMode && (
                  <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    margin='none'
                    flexBasis={'50%'}
                  >
                    Update Patient Details
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Typography variant='h5' component='h2' gutterBottom sx={{ mb: 4 }}>
          Owner Details
        </Typography>
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box display='flex' alignItems='center'>
                <Typography variant='body1' sx={{ marginRight: 1 }}>
                  <strong>First Name:</strong>
                </Typography>
                <TextField
                  value={ownerData.firstName}
                  margin='none'
                  variant='standard'
                  disabled={!editMode}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' alignItems='center'>
                <Typography variant='body1' sx={{ marginRight: 1 }}>
                  <strong>Last Name:</strong>
                </Typography>
                <TextField
                  value={ownerData.lastName}
                  margin='none'
                  variant='standard'
                  disabled={!editMode}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' alignItems='center'>
                <Typography variant='body1' sx={{ marginRight: 1 }}>
                  <strong>Phone:</strong>
                </Typography>
                <TextField
                  value={ownerData.phone}
                  margin='none'
                  variant='standard'
                  disabled={!editMode}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' alignItems='center'>
                <Typography variant='body1' sx={{ marginRight: 1 }}>
                  <strong>Email:</strong>
                </Typography>
                <TextField
                  value={ownerData.email}
                  margin='none'
                  variant='standard'
                  disabled={!editMode}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display='flex' alignItems='center'>
                <Typography variant='body1' sx={{ marginRight: 1 }}>
                  <strong>Address:</strong>
                </Typography>
                <TextField
                  value={ownerData.address}
                  margin='none'
                  fullWidth
                  variant='standard'
                  disabled={!editMode}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginY: 2 }} />
              <Box display='flex' alignItems='center'>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  flexBasis={'50%'}
                >
                  <strong>Last Updated:</strong> {ownerData.lastUpdated}
                </Typography>
                {editMode && (
                  <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    flexBasis={'50%'}
                  >
                    Update Owner Details
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Drawer>
  );
}

export default PatientDetails;
