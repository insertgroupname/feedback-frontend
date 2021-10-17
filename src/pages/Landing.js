import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid, CircularProgress } from '@material-ui/core';
import LandingToolbar from '../components/landing/LandingToolbar';
import LandingCard from 'src/components/landing/LandingCard';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../redux/actions/itemsActions';

const Landing = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authentication);
  const { userId } = authState;

  const itemsState = useSelector((state) => state.items);
  const { isLoading, items } = itemsState;

  useEffect(() => {
    if (userId) {
      dispatch(getItems(userId));
    }
  }, [dispatch, userId]);

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
        <Container maxWidth={false} sx={{ height: '100%' }}>
          <LandingToolbar />
          {isLoading ? (
            <Box
              sx={{
                height: '90%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {items.map((user) => (
                  <Grid item key={user.videoUUID} lg={4} md={6} xs={12}>
                    <LandingCard user={user} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Landing;
