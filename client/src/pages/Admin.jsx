import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Button,
  TextField,
  Drawer,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../slices/snackbar';
import AddIcon from '@mui/icons-material/Add';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import ScienceIcon from '@mui/icons-material/Science';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { createUser, getUserDetails } from '../services/user.js';
import Loading from '../components/Loading';
import GenericTable from '../components/GenericTable.jsx';

const columns = [
  { headerName: 'User ID', field: 'staffId' },
  { headerName: 'First Name', field: 'firstName' },
  { headerName: 'Last Name', field: 'lastName' },
  { headerName: 'Role', field: 'user.role' },
  { headerName: 'Specialization', field: 'specialization' },
  { headerName: 'User Email', field: 'email' },
  { headerName: 'Owner Phone', field: 'phone' },
];

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    email: '',
    role: '',
    password: '',
    firstName: '',
    lastName: '',
    specialization: '',
    phone: '',
  });
  const [summary, setSummary] = useState({
    doctor: 0,
    nurse: 0,
    lab: 0,
    pharmacist: 0,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  //function to Auto generate the password...
  const generatePassword = () => {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 10; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };

  // fetch the user data from the database...
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const userData = await getUserDetails();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let counts = {};
    users.forEach(user => {
      const role = user?.user?.role;
      if (counts[role]) {
        counts[role] += 1;
      } else {
        counts[role] = 1;
      }
    });

    // const counts = {
    //   doctors: users.filter(user => user?.user?.role === 'doctor').length,
    //   nurses: users.filter(user => user?.user?.role === 'nurse').length,
    //   labs: users.filter(user => user?.user?.role === 'lab').length,
    //   pharmacists: users.filter(user => user?.user?.role === 'pharmacist')
    //     .length,
    // };
    console.log({ counts });
    setSummary(counts);
  }, [users]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const handleRoleChange = e => {
    setNewUser({ ...newUser, role: e.target.value });
  };

  // Validation
  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!newUser.firstName) {
      tempErrors.firstName = 'First Name is required';
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(newUser.firstName)) {
      tempErrors.firstName = 'Please enter a valid first name';
      isValid = false;
    }

    if (!newUser.lastName) {
      tempErrors.lastName = 'Last Name is required';
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(newUser.lastName)) {
      tempErrors.lastName = 'Please enter a valid last name';
      isValid = false;
    }

    if (!newUser.specialization) {
      tempErrors.specialization = 'Specialization is required';
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(newUser.specialization)) {
      tempErrors.specialization = 'Please enter a valid specialization';
      isValid = false;
    }

    if (!newUser.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      tempErrors.email = 'Email is not valid';
      isValid = false;
    }

    if (!newUser.phone) {
      tempErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(newUser.phone)) {
      tempErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleAddUser = async () => {
    if (!validate()) {
      return;
    }
    const password = generatePassword();
    const userWithPassword = { ...newUser, password };
    try {
      await createUser(userWithPassword);
      dispatch(
        showSnackbar({
          message: `User registered successfully. \n password sent to email. \n Password: ${password}`,
          severity: 'success',
        })
      );
      setUsers([...users, userWithPassword]);
      setNewUser({
        email: '',
        password: '',
        role: '',
        firstName: '',
        lastName: '',
        specialization: '',
        phone: '',
      });
      setDrawerOpen(false);
    } catch (error) {
      dispatch(
        showSnackbar({ message: 'User registration failed', severity: 'error' })
      );
    }
  };

  // This is a front end delete, will be replaced later.
  const handleDeleteUser = id => {
    console.log({ id });
    const usersUpdated = users.filter((user, i) => {
      console.log({ user });
      return user._id !== id;
    });
    console.log({ usersUpdated });
    setUsers(usersUpdated);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth='lg'
        sx={{
          marginTop: 4,
        }}
      >
        {/* Summary Cards Section */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={4}
          sx={{ mb: 4, justifyContent: 'left' }}
        >
          <Card>
            <CardContent>
              <LocalHospitalIcon fontSize='large' color='primary' />
              <Typography variant='h6'>Doctors</Typography>
              <Typography variant='h4'>{summary.doctor}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <PersonIcon fontSize='large' color='primary' />
              <Typography variant='h6'>Nurses</Typography>
              <Typography variant='h4'>{summary.nurse}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <ScienceIcon fontSize='large' color='primary' />
              <Typography variant='h6'>Lab Technicians</Typography>
              <Typography variant='h4'>{summary.lab}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <MedicalServicesIcon fontSize='large' color='primary' />
              <Typography variant='h6'>Pharmacists</Typography>
              <Typography variant='h4'>{summary.pharmacist}</Typography>
            </CardContent>
          </Card>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            variant='contained'
            color='primary'
            startIcon={<AddIcon />}
            onClick={() => setDrawerOpen(true)}
            sx={{ marginBottom: 2 }}
          >
            Add User
          </Button>
        </Box>
        <Typography
          variant='h2'
          component='h2'
          marginBottom={2}
          fontSize={{ xs: 20, sm: 30 }}
        >
          Current Users
        </Typography>

        <GenericTable
          columns={columns}
          data={users}
          actions={['delete']}
          onRowClick={row => {}}
          onDelete={row => handleDeleteUser(row._id)}
        />
      </Container>

      {/* Side Panel Drawer for Adding Users */}
      <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 300, padding: 3 }}>
          <Typography variant='h6' sx={{ marginBottom: 2 }}>
            Add New User
          </Typography>

          <TextField
            fullWidth
            label='First Name'
            name='firstName'
            value={newUser.firstName}
            onChange={handleInputChange}
            margin='normal'
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            fullWidth
            label='Last Name'
            name='lastName'
            value={newUser.lastName}
            onChange={handleInputChange}
            margin='normal'
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            fullWidth
            label='Specialization'
            name='specialization'
            value={newUser.specialization}
            onChange={handleInputChange}
            margin='normal'
            error={!!errors.specialization}
            helperText={errors.specialization}
          />
          <TextField
            fullWidth
            label='Email'
            variant='outlined'
            name='email'
            value={newUser.email}
            onChange={handleInputChange}
            margin='normal'
            error={!!errors.email}
            helperText={errors.email}
          />
          {/* <TextField
            fullWidth
            label="Role (Doctor, Nurse, etc.)"
            variant="outlined"
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
            margin="normal"
          /> */}

          <FormControl fullWidth margin='normal'>
            <InputLabel>Role</InputLabel>
            <Select
              value={newUser.role}
              onChange={handleRoleChange}
              label='Role'
            >
              <MenuItem value='doctor'>Doctor</MenuItem>
              <MenuItem value='nurse'>Nurse</MenuItem>
              <MenuItem value='lab'>Lab</MenuItem>
              <MenuItem value='pharmacist'>Pharmacist</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label='Phone Number'
            name='phone'
            value={newUser.phone}
            onChange={handleInputChange}
            margin='normal'
            error={!!errors.phone}
            helperText={errors.phone}
          />

          <Button
            variant='contained'
            color='primary'
            onClick={handleAddUser}
            sx={{ marginTop: 2 }}
          >
            Add User
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Admin;
