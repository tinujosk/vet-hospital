import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Layout from './Layout';
import { isTokenExpired } from '../util';
import { clearUserData } from '../slices/authSlice';

// Role Based Access Control(RBAC)
const hasPermission = (path, role) => {
  console.log({ path }, { role });
  const permissions = {
    admin: ['/admin', '/patients'],
    doctor: ['/doctor', '/patients'],
    nurse: ['/nurse', '/patients'],
    lab: ['/lab', '/patients'],
    pharmacist: ['/pharmacy', '/patients'],
  };
  if (role && permissions[role]) {
    return permissions[role].includes(path);
  }
  return false;
};

const ProtectedRoute = ({ element, path, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector(state => state.auth.role);
  if (!role) {
    return <div>Page cannot be accessed or is Loading...</div>;
  }
  if (isTokenExpired()) {
    // Token is expired, log out
    dispatch(clearUserData());
    localStorage.removeItem('token');
    navigate('/');
  }
  return hasPermission(path, role) ? (
    <Layout title={title}>{element}</Layout>
  ) : (
    <Navigate to='/unauthorized' />
  );
};

export default ProtectedRoute;
