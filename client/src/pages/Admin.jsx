import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
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
  Menu,
  MenuItem,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Admin = () => {
  const [users, setUsers] = useState([
    { name: 'Dr. John Doe', role: 'Doctor', contact: '123-456-7890' },
    { name: 'Nurse Jane Smith', role: 'Nurse', contact: '987-654-3210' },
    {
      name: 'Lab Assistant Emily Davis',
      role: 'Lab Assistant',
      contact: '555-123-4567',
    },
  ]);
  const [newUser, setNewUser] = useState({ name: '', role: '', contact: '' });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.role && newUser.contact) {
      setUsers([...users, newUser]);
      setNewUser({ name: '', role: '', contact: '' }); // reset form
      setDrawerOpen(false); // close drawer after adding user
    } else {
      alert('Please fill out all fields before adding a new user.');
    }
  };

  const handleDeleteUser = index => {
    setUsers(users.filter((_, i) => i !== index));
  };

  // Menu handlers
  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Logic for logging out the admin can be added here
    console.log('Logging out...');
    handleMenuClose();
  };

  return (
    <>
      <AppBar position='static' color='transparent' elevation={0}>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            Vetclinic Pro
          </Typography>
          <IconButton color='inherit' onClick={handleMenuClick}>
            <PersonIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Admin Info</MenuItem>
            <MenuItem onClick={handleMenuClose}>Change Password</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth='md' sx={{ marginTop: 4 }}>
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.contact}</TableCell>
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
            label='Name'
            variant='outlined'
            name='name'
            value={newUser.name}
            onChange={handleInputChange}
            margin='normal'
          />
          <TextField
            fullWidth
            label='Role (Doctor, Nurse, etc.)'
            variant='outlined'
            name='role'
            value={newUser.role}
            onChange={handleInputChange}
            margin='normal'
          />
          <TextField
            fullWidth
            label='Contact Information'
            variant='outlined'
            name='contact'
            value={newUser.contact}
            onChange={handleInputChange}
            margin='normal'
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
    </>
  );
};

export default Admin;
