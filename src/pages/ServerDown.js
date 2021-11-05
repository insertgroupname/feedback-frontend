import { Helmet } from 'react-helmet';
import { Box, Container, Typography } from '@material-ui/core';

const ServerDown = () => (
  <>
    <Helmet>
      <title>Feedback | 500</title>
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
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h1">
          500: Internal Server Error
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          The server has been down. We will fix it as soon as possible, we are
          apologize for this mistaken
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <img
            alt="Under development"
            src="/static/images/undraw_server_down_s-4-lk.svg"
            style={{
              marginTop: 50,
              display: 'inline-block',
              maxWidth: '100%',
              width: 560
            }}
          />
        </Box>
      </Container>
    </Box>
  </>
);

export default ServerDown;
