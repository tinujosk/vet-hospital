import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch } from 'react-redux';
import { setUserData } from '../slices/auth';
import { loginUser } from '../services/auth';
import { useNavigation } from '../hooks/useNavigation';
import Logo from '../images/logo2.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { redirectToDashboard } = useNavigation();

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const { token } = await loginUser(email, password);
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;

      // dispatch into redux store
      dispatch(
        setUserData({
          userId: decodedToken.userId,
          email: decodedToken.email,
          role,
        })
      );

      redirectToDashboard(role);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      component='main'
      maxWidth={false}
      sx={{ height: '100vh', py: 10, backgroundColor: '#F1F4F7' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component='img'
          alt='Logo'
          src={Logo}
          sx={{ width: 200, height: 130 }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign In
          </Typography>
        </Box>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Link href='#' variant='body2'>
              Forgot Password?
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
