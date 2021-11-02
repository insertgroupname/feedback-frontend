import React from 'react';

import { Helmet } from 'react-helmet';

import { Box, Container } from '@material-ui/core';

import RegisterForm from 'src/components/form/RegisterForm';

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Feedback | Register</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <RegisterForm />
        </Container>
      </Box>
    </>
  );
};

export default Register;
