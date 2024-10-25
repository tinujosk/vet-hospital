// Treatment.js
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid2 as Grid,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Box,
} from '@mui/material';
import axios from 'axios';

const steps = [
  {
    label: 'Case Opened',
    description: 'The case has been opened. Initial Symptoms noted.',
  },
  {
    label: 'Preliminary Examination',
    description:
      'The nurse performed an initial examination of the patient, checking for visible signs of illness or injury.',
  },
  {
    label: 'Diagnosis & Prescription',
    description:
      'The doctor has provided the necessary prescription or therapy based on the diagnosis.',
  },
  {
    label: 'Lab Tests Ordered',
    description:
      'The doctor orders lab tests for further investigation, including blood tests, X-rays, or other diagnostic procedures.',
  },
  {
    label: 'Waiting for Lab Results',
    description:
      'The lab tests have been performed, and the medical team is waiting for the results to confirm or refine the diagnosis.',
  },
  {
    label: 'Treatment Completed',
    description:
      'The treatment process is completed, and the patient is either discharged or monitored for further improvement.',
  },
];

const Treatment = ({ appointmentId }) => {
  const [prescriptionDetails, setPrescriptionDetails] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    instructions: '',
  });

  const [activeStep, setActiveStep] = useState(0); // Stepper state

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setPrescriptionDetails({
      ...prescriptionDetails,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/prescriptions', {
        appointmentId,
        ...prescriptionDetails,
      });
      console.log('Prescription added:', response.data);
      // Move to the next step after successful submission
      setActiveStep(prevActiveStep =>
        Math.min(prevActiveStep + 1, steps.length - 1)
      );
      // Reset form
      setPrescriptionDetails({
        medication: '',
        dosage: '',
        frequency: '',
        instructions: '',
      });
    } catch (error) {
      console.error('Error adding prescription:', error);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
      }}
    >
      <Typography variant='h5' gutterBottom textAlign={'center'}>
        Case #2333
      </Typography>
      <Grid container spacing={4} columns={12} justifyContent={'center'}>
        <Grid size={4}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant='h5' gutterBottom marginBottom={4}>
              Prescription
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} direction={'column'}>
                <Grid xs={12}>
                  <TextField
                    label='Medication'
                    name='medication'
                    value={prescriptionDetails.medication}
                    onChange={handleChange}
                    fullWidth
                    required
                    disabled
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    label='Dosage'
                    name='dosage'
                    value={prescriptionDetails.dosage}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    label='Frequency'
                    name='frequency'
                    value={prescriptionDetails.frequency}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    label='Instructions'
                    name='instructions'
                    value={prescriptionDetails.instructions}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid xs={12}>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    disabled
                  >
                    Submit Prescription
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid size={4}>
          <Typography variant='h5' gutterBottom>
            Treatment Status
          </Typography>
          <Stepper activeStep={activeStep} orientation='vertical'>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === steps.length - 1 ? (
                      <Typography variant='caption'>Last step</Typography>
                    ) : (
                      <Typography variant='caption'>'On 2022/22/2'</Typography>
                    )
                  }
                >
                  {step.label}
                </StepLabel>
                {/* Always show step description */}
                {/* <Typography sx={{ marginLeft: 3 }}>
                  {step.description}
                </Typography> */}
                <StepContent>
                  <Typography>{step.description}</Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            // <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>Treat completed - Appointment closed.</Typography>
            // <Button onCli
            // </Paper>
          )}
        </Grid>
        {/* <Box sx={{ mb: 2 }}>
          <Button
            variant='contained'
            onClick={handleNext}
            sx={{ mt: 1, mr: 1 }}
          >
            Continue
            {index === steps.length - 1 ? 'Sign and Complete' : 'Continue'}
          </Button>
          <Button
            disabled={index === 0}
            onClick={handleBack}
            sx={{ mt: 1, mr: 1 }}
          >
            Back
          </Button>
        </Box> */}
      </Grid>
    </Box>
  );
};

export default Treatment;
