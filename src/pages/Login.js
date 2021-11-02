import LoginForm from '../components/form/LoginForm';
import { Helmet } from 'react-helmet';

import { Box, Container } from '@material-ui/core';

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Feedback | Login</title>
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
          <LoginForm />
        </Container>
      </Box>
    </>
  );
};

export default Login;
