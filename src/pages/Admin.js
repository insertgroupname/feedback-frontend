import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AddBaseline from 'src/components/admin/AddBaseline';

const Admin = () => {
  return (
    <>
      <Helmet>
        <title>Feedback | Admin</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          height: '100%',
          py: 3
        }}
      >
        {/* {isLoading ? (
          <Box
            sx={{
              height: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        ) : ( */}
        <Container maxWidth="lg">
          <Box sx={{ pt: 3 }}>
            <AddBaseline />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Admin;
