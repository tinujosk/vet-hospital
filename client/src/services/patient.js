import axios from 'axios';
import { API_URL } from '../constants';

// Function to create a new patient
export const createPatient = async patientData => {
  try {
    // Print the patient data to the console
    console.log('Creating patient with data:', patientData);

    const response = await axios.post(`${API_URL}/patients`, patientData);
    return response.data; // Return the created patient data or any relevant response
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error; // Re-throw the error to handle it later
  }
};

export const getPatients = async () => {
  try {
    const response = await axios.get(`${API_URL}/patients`);
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

export const getPatientById = async id => {
  try {
    const response = await axios.get(`${API_URL}/patients/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching patient details:', error);
    throw error;
  }
};
export const updatePatient = async patientData => {
  try {
    // Print the patient data to the console
    console.log('Creating patient with data:', patientData);

    const response = await axios.post(`${API_URL}/createpatient`, patientData);
    return response.data; // Return the created patient data or any relevant response
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error; // Re-throw the error to handle it later
  }
};
