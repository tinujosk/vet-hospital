import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { searchMedication } from '../services/medication';

const AddMedicationsForm = ({ isModalOpen, closeModal, setMedications }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [errors, setErrors] = useState({
    selectedMedicine: '',
    dosage: '',
    frequency: '',
    duration: '',
  });
  // const [medication, setMedication] = useState([]);

  const validate = () => {
    let tempErrors = {
      selectedMedicine: '',
      dosage: '',
      frequency: '',
      duration: '',
    };
    let isValid = true;

    if (!selectedMedicine) {
      tempErrors.selectedMedicine = 'Please select a medicine';
      isValid = false;
    }
    if (!dosage) {
      tempErrors.dosage = 'Please select a dosage';
      isValid = false;
    }

    if (!frequency) {
      tempErrors.frequency = 'Please select a frequency';
      isValid = false;
    }

    if (!duration) {
      tempErrors.duration = 'Please select a duration';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSearch = async e => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim()) {
      const response = await searchMedication(term);
      setMedicines(response);
    } else {
      setMedicines([]);
    }
  };

  // useEffect(() => {
  //   console.log('prescription', medication);
  // }, [medication]);

  const handleAddMedicine = () => {
    if (validate()) {
      const newMedication = {
        medicineId: selectedMedicine._id,
        name: selectedMedicine.name,
        dosage,
        frequency,
        duration,
      };

      // setMedication(newMedication);
      setMedications(newMedication);
      setSelectedMedicine(null);
      setSearchTerm('');
      setDosage('');
      setFrequency('');
      setDuration('');
      closeModal();
    }
  };

  return (
    <Dialog open={isModalOpen} onClose={closeModal} fullWidth maxWidth="sm">
      <DialogTitle>Add Medications</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              options={medicines}
              getOptionLabel={option => option.name}
              onInputChange={(event, value) => setSearchTerm(value)}
              inputValue={searchTerm}
              onChange={(event, newValue) => setSelectedMedicine(newValue)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Search Medicine"
                  variant="outlined"
                  fullWidth
                  onChange={handleSearch}
                  placeholder="Type to search..."
                  error={!!errors.selectedMedicine}
                  helperText={errors.selectedMedicine}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Dosage"
              variant="outlined"
              fullWidth
              value={dosage}
              onChange={e => setDosage(e.target.value)}
              placeholder="e.g., 500mg"
              error={!!errors.dosage}
              helperText={errors.dosage}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Frequency"
              variant="outlined"
              fullWidth
              value={frequency}
              onChange={e => setFrequency(e.target.value)}
              placeholder="e.g., twice a day"
              error={!!errors.frequency}
              helperText={errors.frequency}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Duration"
              variant="outlined"
              fullWidth
              value={duration}
              onChange={e => setDuration(e.target.value)}
              placeholder="e.g., for a week"
              error={!!errors.duration}
              helperText={errors.duration}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMedicine}
              fullWidth
            >
              Add to Prescription
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMedicationsForm;
