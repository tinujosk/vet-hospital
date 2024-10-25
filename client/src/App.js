import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Doctor from './pages/Doctor';
import Treatment from './pages/Treatment';
import Nurse from './pages/Nurse';
import Lab from './pages/Lab';
import Pharmacy from './pages/Pharmacy';
import PatientList from './pages/PatientList';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { getUserDetailsFromToken } from './util';
import { setUserData, clearUserData } from './slices/authSlice';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4F97AC',
      light: '#7FB7C4',
      dark: '#346878',
    },
    secondary: {
      main: '#58A47E',
      light: '#58A47E',
      dark: '#3E7A5B',
    },
    layout: {
      main: '#0A1D23',
    },
    // error: {
    //   main: '#d32f2f',
    // },
    // background: {
    //   default: '#f4f4f4',
    //   paper: '#ffffff',
    // },
    // text: {
    //   primary: '#000000',
    //   secondary: '#4f4f4f',
    // },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const { userId, email, role } = getUserDetailsFromToken() || {};
      if (userId) dispatch(setUserData({ userId, email, role }));
    } catch (error) {
      console.error('Invalid token', error);
      dispatch(clearUserData());
      localStorage.removeItem('token');
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route
            path='/doctor'
            element={
              <ProtectedRoute
                element={<Doctor />}
                title="Doctor's Dashboard"
                path='/doctor'
              />
            }
          />
          <Route
            path='/treatment/:id'
            element={
              <ProtectedRoute
                element={<Treatment />}
                title='Patient Treatment'
                path='/treatment'
              />
            }
          />
          <Route
            path='/admin'
            element={
              <ProtectedRoute
                element={<Admin />}
                title='Admin Dashboard'
                path='/admin'
              />
            }
          />
          <Route
            path='/nurse'
            element={
              <ProtectedRoute
                element={<Nurse />}
                title="Nurse's Dashboard"
                path='/nurse'
              />
            }
          />
          <Route
            path='/lab'
            element={
              <ProtectedRoute
                element={<Lab />}
                title='Lab Dashboard'
                path='/lab'
              />
            }
          />
          <Route
            path='/pharmacy'
            element={
              <ProtectedRoute
                element={<Pharmacy />}
                title='Pharmacy Dashboard'
                path='/pharmacy'
              />
            }
          />
          <Route
            path='/patients'
            element={
              <ProtectedRoute
                element={<PatientList />}
                title="Patient's List"
                path='/patients'
              />
            }
          />
          <Route
            path='/unauthorized'
            element={
              <NotFound
                reason={{
                  reasonCode: '401',
                  reasonTitle: 'Unauthorized Access',
                  reasonDescription:
                    'You do not have permission to view this page.',
                }}
              />
            }
          />
          <Route
            path='*'
            element={
              <NotFound
                reason={{
                  reasonCode: '404',
                  reasonTitle: 'Page Not Found',
                  reasonDescription:
                    "Sorry, the page you're looking for doesn't exist",
                }}
              />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
