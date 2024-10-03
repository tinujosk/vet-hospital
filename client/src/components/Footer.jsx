import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        height: '12vh',
        py: 2,
        px: 2,
        mt: 'auto',
        backgroundColor: 'layout.main',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Container maxWidth='lg'>
        <Typography variant='body2'>
          &copy; {new Date().getFullYear()} VetClinic Pro. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
