import React from 'react';
import { Box, Grid, Typography, Container, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.dark',
        color: 'white',
        py: 4,
        mt: 4,
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant='h6' gutterBottom>
              About VetClinicPro
            </Typography>
            <Typography variant='body2' color='inherit'>
              At VetClinicPro, we provide top-notch care for your pets with a
              dedicated team of professionals.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant='h6' gutterBottom>
              Services
            </Typography>
            <Typography variant='body2' color='inherit'>
              Pet Health Checkups
            </Typography>
            <Typography variant='body2' color='inherit'>
              Vaccinations
            </Typography>
            <Typography variant='body2' color='inherit'>
              Dental Care
            </Typography>
            <Typography variant='body2' color='inherit'>
              Emergency Services
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant='h6' gutterBottom>
              Contact Us
            </Typography>
            <Typography variant='body2' color='inherit'>
              Phone: +1-800-VET-PRO
            </Typography>
            <Typography variant='body2' color='inherit'>
              Email: support@vetclinicpro.com
            </Typography>
            <Typography variant='body2' color='inherit'>
              Address: Conestoga Doon, Ontario, Canada.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant='h6' gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton
                href='https://facebook.com'
                target='_blank'
                aria-label='Facebook'
                sx={{ color: 'white' }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href='https://instagram.com'
                target='_blank'
                aria-label='Instagram'
                sx={{ color: 'white' }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                href='https://twitter.com'
                target='_blank'
                aria-label='Twitter'
                sx={{ color: 'white' }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                href='https://linkedin.com'
                target='_blank'
                aria-label='LinkedIn'
                sx={{ color: 'white' }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            textAlign: 'center',
            mt: 4,
            pt: 2,
            borderTop: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <Typography variant='body2' color='inherit'>
            &copy; {new Date().getFullYear()} VetClinicPro. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
