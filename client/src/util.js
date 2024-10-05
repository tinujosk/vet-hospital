import { jwtDecode } from 'jwt-decode';

export const getUserDetailsFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) return jwtDecode(token);
};
