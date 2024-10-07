import { jwtDecode } from 'jwt-decode';

export const getUserDetailsFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) return jwtDecode(token);
};

export const isTokenExpired = () => {
  const decodedToken = getUserDetailsFromToken();
  if (decodedToken) {
    const currentTime = Date.now() / 1000;
    console.log({ currentTime }, { decodedTokenTime: decodedToken.exp });
    if (decodedToken.exp < currentTime) {
      return true;
    }
  }
  return false;
};
