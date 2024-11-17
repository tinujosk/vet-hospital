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
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUserData } from '../slices/auth';
import { clearUserDetails } from '../slices/user'; // For clearing user state
import { Link as RouterLink } from 'react-router-dom';
import { getNavItemsForUser } from '../util';
import { fetchUserDetails } from '../slices/user';
import { getUserDetailsFromToken } from '../util';

const Header = ({ username = 'Username' }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector(state => state.auth.role);
  const { user } = useSelector((state) => state.user);

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
    dispatch(clearUserDetails()); // Clear user state
    handleMenuClose();
    navigate('/');
  };

  const handleMyAccount = async () => {
    try {
      const { userId } = getUserDetailsFromToken();
      if (!userId) {
        console.error('Token expired or userId not found. Logging out...');
        handleLogout(); // Redirect to login
        return;
      }
  
      if (!user) {
        console.log('Fetching user details...');
        await dispatch(fetchUserDetails(userId));
        console.log("data is fetched that user is logged first")
      }
  
      handleMenuClose();
      navigate('/user');
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
    }
  };

  const handleToggleDrawer = open => () => {
    setMobileNavOpen(open);
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
            <Link component={RouterLink} color='secondary' underline='none'>
              VetClinic Pro
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map((page, index) => (
              <Link
                key={index}
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginRight: { xs: 2, md: 0 },
            }}
          >
            <Chip
              avatar={<Avatar>{username.charAt(0)}</Avatar>}
              label={username}
              variant='outlined'
              color='primary'
              onClick={handleMenuOpen}
              sx={{ ml: 2, cursor: 'pointer' }}
            />
          </Box>

          <IconButton
            edge='start'
            color='secondary'
            aria-label='menu'
            sx={{ display: { xs: 'block', md: 'none' } }}
            onClick={handleToggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
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
            <MenuItem onClick={handleMyAccount}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor='right'
        open={isMobileNavOpen}
        onClose={handleToggleDrawer(false)}
      >
        <Box
          sx={{
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
          role='presentation'
          onClick={handleToggleDrawer(false)}
          onKeyDown={handleToggleDrawer(false)}
        >
          <IconButton
            edge='start'
            color='inherit'
            aria-label='close'
            sx={{ alignSelf: 'flex-end', mt: 1, mr: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <List>
            {navLinks.map((link, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton component='a' href={link}>
                  <ListItemText
                    primary={link.charAt(1).toUpperCase() + link.slice(2)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
export default Header;
