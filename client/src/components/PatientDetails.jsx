import React, { useState } from 'react';
import {
  Drawer,
  Button,
  Typography,
  Grid,
  Divider,
  Box,
  Paper,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,

} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NoImage from '../images/noimage.png';

function PatientDetails({
  patientDetails,
  drawerOpen,
  handleCloseDrawer,
  handleUpdatePatient,
  editMode,
}) {
  const { patientData, ownerData } = patientDetails;
  const [updatedPatient, setUpdatedPatient] = useState(patientData);
  const [updatedOwner, setUpdatedOwner] = useState(ownerData);

  const handlePatientInputChange = (field, value) => {
    setUpdatedPatient((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOwnerInputChange = (field, value) => {
    setUpdatedOwner((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const mergedData = { ...updatedPatient, owner: updatedOwner };
    handleUpdatePatient(mergedData);
    handleCloseDrawer();
  };

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
      <Box sx={{ width: 600, padding: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            Patient Details
          </Typography>
          <IconButton onClick={handleCloseDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box component="img" sx={{ width: '100%' }} alt="Patient Image" src={NoImage} />
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 6 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Name:</strong></Typography>
              <TextField
                value={updatedPatient.name}
                onChange={(e) => handlePatientInputChange("name", e.target.value)}
                margin="none"
                variant="standard"
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Species:</strong></Typography>
              <TextField
                value={updatedPatient.species}
                onChange={(e) => handlePatientInputChange("species", e.target.value)}
                margin="none"
                variant="standard"
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Breed:</strong></Typography>
              <TextField
                value={updatedPatient.breed}
                onChange={(e) => handlePatientInputChange("breed", e.target.value)}
                margin="none"
                variant="standard"
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Age:</strong></Typography>
              <TextField
                type="number"
                value={updatedPatient.age}
                onChange={(e) => handlePatientInputChange("age", e.target.value)}
                margin="none"
                variant="standard"
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Gender:</strong></Typography>
              <FormControl variant="standard" margin="none" disabled={!editMode}>
                <Select
                  labelId="gender-label"
                  value={updatedPatient.gender}
                  onChange={(e) => handlePatientInputChange("gender", e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Weight:</strong></Typography>
              <TextField
                value={updatedPatient.weight}
                onChange={(e) => handlePatientInputChange("weight", e.target.value)}
                margin="none"
                variant="standard"
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ marginY: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" component="h3" gutterBottom>
                Medical History:
              </Typography>
              <ul>
                {patientData.medicalHistory?.map((item, index) => (
                  <li key={index}>
                    <Typography variant="body2">{item}</Typography>
                  </li>
                ))}
              </ul>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1"><strong>Owner First Name:</strong></Typography>
              <TextField
                value={updatedOwner.firstName}
                onChange={(e) => handleOwnerInputChange("firstName", e.target.value)}
                margin="none"
                variant="standard"
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Owner Last Name:</strong></Typography>
              <TextField
                value={updatedOwner.lastName}
                onChange={(e) => handleOwnerInputChange("lastName", e.target.value)}
                margin="none"
                variant="standard"
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Owner Phone:</strong></Typography>
              <TextField
                value={updatedOwner.phone}
                onChange={(e) => handleOwnerInputChange("phone", e.target.value)}
                margin="none"
                variant="standard"
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Owner Email:</strong></Typography>
              <TextField
                value={updatedOwner.email}
                onChange={(e) => handleOwnerInputChange("email", e.target.value)}
                margin="none"
                variant="standard"
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Owner Address:</strong></Typography>
              <TextField
                value={updatedOwner.address}
                onChange={(e) => handleOwnerInputChange("address", e.target.value)}
                margin="none"
                fullWidth
                variant="standard"
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                Update Patient Details
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Drawer>
  );
}

export default PatientDetails;
