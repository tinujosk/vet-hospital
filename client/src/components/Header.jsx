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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUserData } from '../slices/authSlice';
import { Link as RouterLink } from 'react-router-dom';
import { getNavItemsForUser } from '../util';

const Header = ({ username = 'Username' }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector(state => state.auth.role);

  const navLinks = getNavItemsForUser(role);

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
    navigate('/');
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
              // to='/'
              color='secondary'
              underline='none'
            >
              VetClinic Pro
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {navLinks.map((page, index) => (
              <Link
                component={RouterLink}
                to={page}
                color='secondary'
                underline='none'
                marginRight={2}
              >
                {page.charAt(1).toUpperCase() + page.slice(2)}
              </Link>
            ))}
          </Box>
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
