import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  Chip,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUserData } from '../slices/authSlice';
import { Link as RouterLink } from 'react-router-dom';

const Header = ({ username = 'Username' }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUserData());
    handleMenuClose();
    navigate('/login');
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <Box>
      <AppBar
        position='static'
        color='primary'
        sx={{ backgroundColor: 'layout.main' }}
      >
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link
              component={RouterLink}
              to='/'
              color='secondary'
              underline='none'
            >
              VetClinic Pro
            </Link>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Chip
              avatar={<Avatar>{username.charAt(0)}</Avatar>}
              label={username}
              variant='outlined'
              color='primary'
              onClick={handleMenuOpen}
              sx={{ ml: 2, cursor: 'pointer' }}
            />
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
