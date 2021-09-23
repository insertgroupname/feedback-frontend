import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid, CircularProgress } from '@material-ui/core';
import LandingToolbar from '../components/landing/LandingToolbar';
import LandingCard from 'src/components/landing/LandingCard';
import { url } from 'src/utils/globalVariable';
import { UserContext } from 'src/contexts/UserContext';
const Landing = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${url}/records/${user.userId}`);
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
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Feedback | Landing</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          height: '100%',
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
                {userData.map((user) => (
                  <Grid item key={user.videoUUID} lg={4} md={6} xs={12}>
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
