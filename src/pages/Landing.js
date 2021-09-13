import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid, CircularProgress } from '@material-ui/core';
import LandingToolbar from '../components/landing/LandingToolbar';
import LandingCard from 'src/components/landing/LandingCard';
const Landing = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      let userId = '0000';
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://10.4.56.44/api/v1/records/${userId}`
        );
        setIsLoading(false);
        const responseData = response.data;
        console.log('Response', responseData);
        setUserData(responseData);
      } catch (e) {
        if (e.response) {
          console.log(e.response.data);
          console.log(e.response.status);
          console.log(e.response.headers);
        } else if (e.request) {
          console.log(e.request);
        } else {
          console.log('e', e.message);
        }
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);
  return (
    <>
      <Helmet>
        <title>Landing</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        {isLoading ? (
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
        ) : (
          <Container maxWidth={false}>
            <LandingToolbar />
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {userData.map((user, index) => (
                  <Grid item key={index} lg={4} md={6} xs={12}>
                    <LandingCard user={user} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
};

export default Landing;
