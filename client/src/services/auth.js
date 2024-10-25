import axios from 'axios';
import { API_URL } from '../constants';

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};
