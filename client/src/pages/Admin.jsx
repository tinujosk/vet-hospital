import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  IconButton,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Drawer,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../slices/snackbar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { createUser, getUserDetails } from '../services/user.js';
import Loading from '../components/Loading';

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [errors, setErrors] = useState(false);
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleRoleChange = (e) => {
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

  const handleDeleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
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
        padding: 4,
      }}
    >
      <Container maxWidth='lg' sx={{ marginTop: 4 }}>
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon />}
          onClick={() => setDrawerOpen(true)}
          sx={{ marginBottom: 2 }}
        >
          Add User
        </Button>

        <h2>Current Users</h2>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: { md: '95%', sm: '100%' }, maxHeight: '500px' }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>User Name</TableCell>
                {/* <TableCell>Password</TableCell> */}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.user?.role}</TableCell>
                  <TableCell>{user.specialization}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  {/* <TableCell>{"**********"}</TableCell> */}
                  {/* <TableCell>{user.user?.password}</TableCell> */}
                  <TableCell>
                    <IconButton color='primary'>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color='secondary'
                      onClick={() => handleDeleteUser(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
