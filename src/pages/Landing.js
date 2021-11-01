import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid, CircularProgress } from '@material-ui/core';
import LandingToolbar from '../components/landing/LandingToolbar';
import LandingCard from 'src/components/landing/LandingCard';
import { useSelector } from 'react-redux';
import LandingInitial from 'src/components/landing/LandingInitial';

const Landing = () => {
  const itemsState = useSelector((state) => state.items);
  const { isLoading, items } = itemsState;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <LandingToolbar
              itemLength={items.length}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              open={open}
            />
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {items.length > 0 ? (
                  items.map((item) => (
                    <Grid item key={item.videoUUID} lg={4} md={6} xs={12}>
                      <LandingCard item={item} />
                    </Grid>
                  ))
                ) : (
                  <LandingInitial
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    open={open}
                  />
                )}
              </Grid>
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
};

export default Landing;
