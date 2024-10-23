import axios from 'axios';

const API_URL = 'http://localhost:3001';// Replace with your actual API URL

// Function to create an appointment
export const createAppointment = async (appointmentData) => {
  try {
    // Make POST request to the API to create a new appointment
    const response = await axios.post(`${API_URL}/createappointments`, appointmentData);
    
    // Return the created appointment data from the API response
    return response.data;
  } catch (error) {
    // Handle errors (e.g., network issues, API errors)
    console.error('Error creating appointment:', error);
    throw error;
  }
};
export const getAppointments = async () => {
  try {
      const response = await axios.get(`${API_URL}/nurse`);
      return response.data;
  } catch (error) {
      console.error('Error fetching Appointments:', error);
      throw error;
  }
};

export const getAppointmentsById= async (id) => {
  try {
      const response = await axios.get(`${API_URL}/appointmnet/${id}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching Appointment details:', error);
      throw error;
  }
};