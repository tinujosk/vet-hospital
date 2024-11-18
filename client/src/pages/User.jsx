import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserDetails } from '../slices/user';
import {
  Typography,
  Button,
  Container,
  Avatar,
  Box,
  Divider,
} from '@mui/material';
import { getUserDetailsFromToken } from '../util';

const User = () => {
  const dispatch = useDispatch();
  const { staffDetails, loading, error } = useSelector(state => state.user);

  useEffect(() => {
    if (Object.keys(staffDetails?.length === 0)) {
      const { userId } = getUserDetailsFromToken() || {};
      if (userId) {
        dispatch(fetchUserDetails(userId));
      }
    }
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handlePasswordChange = () => {
    alert('Password change functionality to be implemented!');
  };

  return (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <Divider sx={{ mb: 3 }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' },
          justifyContent: 'space-between',
          gap: 4,
        }}
      >
        {/* Avatar Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              width: 150,
              height: 150,
              fontSize: 48,
              bgcolor: 'primary.main',
            }}
          >
            {staffDetails?.firstName?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
        </Box>

        {/* User Details Section */}
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Typography variant='h6' sx={{ mb: 2 }}>
            <strong>Name:</strong>{' '}
            {`${staffDetails?.firstName} ${staffDetails?.lastName}` || 'N/A'}
          </Typography>
          <Typography variant='h6' sx={{ mb: 2 }}>
            <strong>Role:</strong> {staffDetails?.user?.role || 'N/A'}
          </Typography>
          {staffDetails?.specialization && (
            <Typography variant='h6' sx={{ mb: 2 }}>
              <strong>Specialization:</strong>{' '}
              {staffDetails?.specialization || 'N/A'}
            </Typography>
          )}
          <Typography variant='h6' sx={{ mb: 2 }}>
            <strong>Email:</strong> {staffDetails?.user?.email || 'N/A'}
          </Typography>
          <Typography variant='h6' sx={{ mb: 2 }}>
            <strong>Secondary Email:</strong> {staffDetails?.email || 'N/A'}
          </Typography>
          <Typography variant='h6' sx={{ mb: 2 }}>
            <strong>Phone:</strong> {staffDetails?.phone || 'N/A'}
          </Typography>
          <Button
            variant='contained'
            color='primary'
            onClick={handlePasswordChange}
            sx={{ mt: 2 }}
          >
            Change Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default User;
