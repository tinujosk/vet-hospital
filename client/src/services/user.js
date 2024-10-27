import axios from 'axios'; 
import { API_URL } from '../constants'; 

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/createUser`, userData);
    console.log('User created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; 
  }
};

export const getUserDetails = async ()=>{
  try {
    const response = await axios.get(`${API_URL}/getUserDetails`);
    console.log('User data fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error; 
  }
}
