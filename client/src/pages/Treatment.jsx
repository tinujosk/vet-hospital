import React, { useEffect, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import AddMedications from '../components/AddMedication';
import MedicationTable from '../components/MedicationTable';
import { getAppointment } from '../services/appointment';
import { createPrescription, getPrescription } from '../services/prescription';
import { showSnackbar } from '../slices/snackbar';

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

const statusMap = {
  Pending: 0,
  Completed: 1,
};

const Treatment = () => {
  const [appointment, setAppointment] = useState();
  const [medications, setMedications] = useState([]);
  const [prescription, setPrescription] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const result = await getAppointment(id);
        setAppointment(result);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    const fetchPrescription = async () => {
      try {
        const result = await getPrescription(id);
        // console.log({ result });
        if (result) setPrescription(result);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
    fetchPrescription();
  }, [id]);

  useEffect(() => {
    console.log({ prescription: prescription.medications, medications });
    setMedications(prescription?.medications || []);
  }, [prescription]);

  useEffect(() => {
    setActiveStep(statusMap[appointment?.status]);
  }, [appointment]);

  const handleChange = e => {
    const { name, value } = e.target;
    setPrescription({
      ...prescription,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const newPrescription = {
        ...prescription,
        medications,
        appointment: appointment._id,
      };

      setLoading(true);
      const result = await createPrescription(newPrescription);
      if (result) {
        setLoading(false);
        dispatch(
          showSnackbar({ message: 'Prescription added', severity: 'success' })
        );
      }
    } catch (error) {
      console.error('Error adding prescription:', error);
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        padding: 4,
      }}
    >
      <Typography variant='h5' marginBottom={4}>
        Case #{appointment?.appointmentId}
        <span
          style={{
            display: 'inline',
            marginLeft: '10px',
            fontWeight: 'normal',
            fontSize: '20px',
          }}
        >
          (
          {`Appointment for: ${appointment?.patient?.name}, ${appointment?.patient?.species}, ${appointment?.patient?.age} yrs`}
          )
        </span>
      </Typography>

      <Grid container spacing={4} columns={12} justifyContent={'center'}>
        <Grid size={4}>
          <Paper
            style={{ padding: '20px', height: '100%' }}
            sx={{ minWidth: 400 }}
          >
            <Typography variant='h5' gutterBottom marginBottom={4}>
              Prescription
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} direction={'column'}>
                <Grid xs={12}>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => setIsModalOpen(true)}
                  >
                    Add Medications
                  </Button>
                  <AddMedications
                    isModalOpen={isModalOpen}
                    closeModal={() => setIsModalOpen(false)}
                    setMedications={medication =>
                      setMedications([...medications, medication])
                    }
                  />
                  {medications?.length !== 0 ? (
                    <MedicationTable medications={medications} />
                  ) : (
                    <Typography
                      variant='h6'
                      color='gray'
                      textAlign='center'
                      padding={5}
                    >
                      {' '}
                      No Medications Added
                    </Typography>
                  )}
                </Grid>
                <Grid xs={12}>
                  <TextField
                    label='Medical Condition'
                    name='medicalCondition'
                    value={prescription.medicalCondition}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    label='Notes'
                    name='notes'
                    value={prescription.notes}
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
                    // disabled
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
