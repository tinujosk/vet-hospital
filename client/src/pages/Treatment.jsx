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
import { createPrescription } from '../services/prescription';
import { showSnackbar } from '../slices/snackbar';

const treatmentSteps = [
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
      'The doctor has provided the necessary prescription or therapy based on the diagnosis, and a lab test have been ordered.',
  },
  {
    label: 'Lab Tests Perfomed',
    description:
      'The lab tests have been performed, and the medical report is available for download.',
  },
  {
    label: 'Treatment Completed',
    description:
      'The treatment process is completed, and the patient is either discharged or monitored for further improvement.',
  },
];

const statusMap = {
  Pending: 0,
  Prelims: 1,
  Diagnosed: 2,
  LabTestsPerformed: 3,
  Completed: 4,
};

const Treatment = () => {
  const [appointment, setAppointment] = useState();
  const [prescription, setPrescription] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({ medicalCondition: '' });

  const { id } = useParams();
  const dispatch = useDispatch();

  const handleDeleteMedicine = id => {
    const newMedications = prescription?.medications?.filter(
      medication => medication._id !== id
    );
    setPrescription({ ...prescription, medications: newMedications });
  };

  const validate = () => {
    let tempErrors = { medicalCondition: '' };
    let isValid = true;

    if (!prescription.medicalCondition) {
      tempErrors.medicalCondition = '* Patients medical condition is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const appointment = await getAppointment(id);
        setAppointment(appointment);
        if (appointment?.prescription) {
          setPrescription(appointment.prescription);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);

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
    if (validate()) {
      try {
        const newPrescription = {
          ...prescription,
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
      <Typography variant="h5" marginBottom={4}>
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
            <Typography variant="h5" gutterBottom marginBottom={3}>
              Prescription
            </Typography>
            {appointment?.status === 'Pending' ? (
              <Typography textAlign="center" variant="h6">
                The preliminary examination has to be completed by the Nurse
                before a prescription can be given.
              </Typography>
            ) : (
              <>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2} direction={'column'}>
                    <Grid xs={12} textAlign="ce">
                      <AddMedications
                        isModalOpen={isModalOpen}
                        closeModal={() => setIsModalOpen(false)}
                        setMedications={medication =>
                          setPrescription({
                            ...prescription,
                            medications: [
                              ...(prescription?.medications || []),
                              medication,
                            ],
                          })
                        }
                      />
                      {prescription?.medications &&
                      prescription?.medications.length ? (
                        <MedicationTable
                          medications={prescription?.medications}
                          handleDeleteMedicine={handleDeleteMedicine}
                        />
                      ) : (
                        <Typography
                          variant="h6"
                          color="gray"
                          textAlign="center"
                          padding={5}
                        >
                          {' '}
                          No Medications Added
                        </Typography>
                      )}
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setIsModalOpen(true)}
                        sx={{ marginTop: 2 }}
                      >
                        Add Medications
                      </Button>
                    </Grid>

                    <Grid xs={12}>
                      <TextField
                        label="Medical Condition"
                        name="medicalCondition"
                        value={prescription?.medicalCondition}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.medicalCondition}
                        helperText={errors.medicalCondition}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <TextField
                        label="Notes"
                        name="notes"
                        value={prescription?.notes}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                      />
                    </Grid>
                    {/* <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={labTestRequired}
                            onChange={handleLabTestChange}
                          />
                        }
                        label="Lab Tests Required"
                      />
                    </FormGroup> */}
                    <Grid xs={12}>
                      {appointment?.prescription && (
                        <Typography
                          gutterBottom
                          sx={{ fontSize: '16px', color: 'red' }}
                        >
                          You have already submitted the prescription. Any
                          changes will be overwritten and will request new lab
                          tests.
                        </Typography>
                      )}
                      <Button type="submit" variant="contained" color="primary">
                        Submit Prescription
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </>
            )}
          </Paper>
        </Grid>
        <Grid size={4}>
          <Typography variant="h5" gutterBottom>
            Treatment Status
          </Typography>
          <Stepper activeStep={activeStep} orientation="vertical">
            {treatmentSteps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === treatmentSteps.length - 1 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : (
                      <Typography variant="caption">'On 2022/22/2'</Typography>
                    )
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Treatment;
