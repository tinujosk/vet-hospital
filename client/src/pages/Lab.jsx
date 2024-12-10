import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";
import { getAppointments } from "../services/appointment";
import { getPatientById } from "../services/patient";
import { createLabDetails, uploadImageToCloudinary } from "../services/labService";

const LabTechnicianPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [labRequests, setLabRequests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [testResultDialog, setTestResultDialog] = useState(false);
  const [patientDetails, setPatientDetails] = useState(null);
  const [imagePreview, setImagePreview] = useState([]);
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

  const initialTestResults = {
    appointmentId: "",
    patientId: "",
    patientName: "",
    testType: "",
    technician: "Current Technician",
    datePerformed: new Date().toISOString().split("T")[0],
    generalObservations: "",
    images: [],
    medicalFindings: "",
    recommendedFollowUp: "",
  };

  const [testResults, setTestResults] = useState(initialTestResults);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    const processLabRequests = async () => {
      const requests = await Promise.all(
        appointments
          .filter(appointment => 
            appointment.prescription?.labTests?.length > 0 && // Filter appointments with test types
            appointment.status === "Diagnosed" // Only show diagnosed appointments
          )
          .map(async (appointment) => {
            const patientDetails = await getPatientById(appointment.patient?._id);
            return {
              appointmentId: appointment._id,
              appointmentId1: appointment.appointmentId,
              patientId: patientDetails?._id,
              patientId1: patientDetails?.patientId,
              patientName: patientDetails?.name || "N/A",
              testType: appointment.prescription?.labTests?.join(", ") || "No Lab Tests",
              doctorName: appointment.doctor?.firstName || "N/A",
              paymentStatus: appointment.payment ? "Paid" : "Unpaid",
            };
          })
      );
      setLabRequests(requests);
    };
    
    if (appointments.length > 0) processLabRequests();
  }, [appointments]);
  

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (files.length === 0) {
      setToast({ open: true, message: "No files selected", severity: "warning" });
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    try {
      const uploadedImages = await uploadImageToCloudinary(formData);
      setTestResults((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedImages],
      }));
      setImagePreview((prev) => [...prev, ...uploadedImages.map((img) => img.url)]);
      setToast({ open: true, message: "Images uploaded successfully", severity: "success" });
    } catch (error) {
      console.error("Error uploading images:", error.message);
      setToast({ open: true, message: "Image upload failed", severity: "error" });
    }
  };

  const handleStartTest = async (test) => {
    if (test.paymentStatus === "Paid") {
      const patientDetails = await getPatientById(test.patientId);
      setTestResults({
        ...initialTestResults,
        appointmentId: test.appointmentId,
        patientId: test.patientId,
        patientName: test.patientName,
        testType: test.testType,
      });
      setPatientDetails(patientDetails);
      setSelectedTest(test);
      setTestResultDialog(true);
    } else {
      setToast({ open: true, message: "Test cannot be performed. Payment is pending.", severity: "error" });
    }
  };

  const handleSubmitTestResult = async (e) => {
    e.preventDefault();
    if (testResults.images.length === 0) {
      setToast({ open: true, message: "Please upload images before submitting.", severity: "warning" });
      return;
    }

    try {
      await createLabDetails({ ...testResults, patient: patientDetails });
      setToast({ open: true, message: "Lab report submitted successfully!", severity: "success" });
      setTestResultDialog(false);
      setTestResults(initialTestResults);
      setImagePreview([]);
    } catch (error) {
      console.error("Failed to submit lab details:", error.message);
      setToast({ open: true, message: "Failed to submit lab details.", severity: "error" });
    }
  };

  const renderTestCards = (tests) => {
    return tests.map((test) => (
      <Grid item xs={12} sm={6} md={4} key={test.appointmentId}>
        <Card>
          <CardContent>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <Chip
                label={test.paymentStatus}
                style={{
                  backgroundColor: test.paymentStatus === "Paid" ? "green" : "red",
                  color: "white",
                }}
              />
            </div>
            <Typography variant="h6">{test.patientName}</Typography>
            <Typography color="textSecondary" gutterBottom>
              Patient ID: {test.patientId1 || "N/A"}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Appointment ID: {test.appointmentId1 || "N/A"}
            </Typography>
            <Typography>Test Type: {test.testType}</Typography>
            <Typography>Doctor: {test.doctorName}</Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => handleStartTest(test)}
              disabled={test.paymentStatus !== "Paid"}
              style={{
                backgroundColor: test.paymentStatus === "Paid" ? "green" : "#d32f2f",
                color: "white",
              }}
              variant="contained"
            >
              {test.paymentStatus === "Paid" ? "Perform Test" : "Payment Pending"}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ));
    
    
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lab Technician Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">
              Paid Tests ({labRequests.filter((r) => r.paymentStatus === "Paid").length})
            </Typography>
            <Grid container spacing={2}>
              {renderTestCards(labRequests.filter((r) => r.paymentStatus === "Paid"))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              Pending Payment Tests ({labRequests.filter((r) => r.paymentStatus === "Unpaid").length})
            </Typography>
            <Grid container spacing={2}>
              {renderTestCards(labRequests.filter((r) => r.paymentStatus === "Unpaid"))}
            </Grid>
          </Grid>
        </Grid>
        <Dialog open={testResultDialog} onClose={() => setTestResultDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Lab Test Results - {testResults.patientName}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmitTestResult}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Test Type" value={testResults.testType} InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="General Observations"
                    value={testResults.generalObservations}
                    onChange={(e) =>
                      setTestResults((prev) => ({ ...prev, generalObservations: e.target.value }))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Medical Findings"
                    value={testResults.medicalFindings}
                    onChange={(e) =>
                      setTestResults((prev) => ({ ...prev, medicalFindings: e.target.value }))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Recommended Follow-up"
                    value={testResults.recommendedFollowUp}
                    onChange={(e) =>
                      setTestResults((prev) => ({ ...prev, recommendedFollowUp: e.target.value }))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    accept="image/*"
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    id="lab-image-upload"
                  />
                  <label htmlFor="lab-image-upload">
                    <Button variant="outlined" component="span">
                      Upload Images
                    </Button>
                  </label>
                </Grid>
                {imagePreview.length > 0 && (
                  <Grid item xs={12}>
                    <Box display="flex" flexWrap="wrap" gap={2}>
                      {imagePreview.map((preview, index) => (
                        <img
                          key={index}
                          src={preview}
                          alt="preview"
                          style={{ width: 100, height: 100, objectFit: "cover" }}
                        />
                      ))}
                    </Box>
                  </Grid>
                )}
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setTestResultDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmitTestResult} color="primary" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={toast.open}
          autoHideDuration={3000}
          onClose={() => setToast({ open: false, message: "", severity: "info" })}
        >
          <Alert onClose={() => setToast({ open: false, message: "", severity: "info" })} severity={toast.severity}>
            {toast.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default LabTechnicianPage;
