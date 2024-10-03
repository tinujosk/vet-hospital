import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Doctor from './pages/Doctor';
import Nurse from './pages/Nurse';
import Lab from './pages/Lab';
import Pharmacy from './pages/Pharmacy';
import PatientList from './pages/PatientList';

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
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            path='/'
            element={
              <Layout title='Treatment Dashboard'>
                <Doctor />
              </Layout>
            }
          />
          <Route
            path='/admin'
            element={
              <Layout title='Admin Dashboard'>
                <Admin />
              </Layout>
            }
          />
          <Route
            path='/nursing'
            element={
              <Layout title='Nursing Dashboard'>
                <Nurse />
              </Layout>
            }
          />
          <Route
            path='/patients'
            element={
              <Layout title="Patient's List">
                <PatientList />
              </Layout>
            }
          />
          <Route
            path='/lab'
            element={
              <Layout title='Lab Dashboard'>
                <Lab />
              </Layout>
            }
          />
          <Route
            path='/pharmacy'
            element={
              <Layout title='Pharmacy Dashboard'>
                <Pharmacy />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
