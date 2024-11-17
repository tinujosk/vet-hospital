import { jwtDecode } from 'jwt-decode';

const permissions = {
  admin: ['/admin', '/doctor', '/patients', '/nurse', '/treatment'],
  doctor: ['/doctor', '/patients', '/treatment'],
  nurse: ['/nurse', '/patients'],
  lab: ['/lab', '/patients'],
  pharmacist: ['/pharmacy', '/patients'],
};

const hideFromNav = ['/treatment'];

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

export const hasPermission = (path, role) => {
  if (role && permissions[role]) {
    return permissions[role].includes(path);
  }
  return false;
};

export const getNavItemsForUser = role => {
  return permissions[role].filter(item => !hideFromNav.includes(item));
};
