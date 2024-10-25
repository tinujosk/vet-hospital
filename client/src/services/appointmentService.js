import axios from 'axios';

const API_URL = 'http://localhost:3001'; 
export const createAppointment = async (appointmentData) => {
  console.log('Creating appointment:', appointmentData);
  try {
    const response = await axios.post(`${API_URL}/createappointments`, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const getAppointments = async () => {
  try {
    const response = await axios.get(`${API_URL}/appointments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Appointments:', error);
    throw error;
  }
};

export const getAppointment = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/appointment/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Appointment details:', error);
    throw error;
  }
};


export const updateAppointment = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/appointments/${id}`, updatedData);
    console.log('Updated Appointment:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating appointment11:', error);
    throw error;
  }
};
