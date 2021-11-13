import { useSelector } from 'react-redux';
import AnalyticDetails from 'src/components/analytics/AnalyticDetails';
import AveragePace from 'src/components/analytics/AveragePace';
import UserOverview from 'src/components/analytics/UserOverview';
import DisfluencyTotalWord from 'src/components/analytics/DisfluencyTotalWord';
import SilenceClipDuration from 'src/components/analytics/SilenceClipDuration';
import SilenceDisfluencyDuration from 'src/components/analytics/SilenceDisfluencyDuration';
import ServerDown from './ServerDown';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress
} from '@material-ui/core';
import DisfluencyClipDuration from 'src/components/analytics/DisfluencyClipDuration';

const UserAnalytics = () => {
  const settingsState = useSelector((state) => state.settings);
  const { isLoading, username, error } = settingsState;

  return (
    <>
      <Helmet>
        <title>Feedback | User Analytics</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          height: '100%'
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
        ) : error ? (
          <ServerDown />
        ) : (
          <Container
            maxWidth={false}
            sx={{
              py: 3
            }}
          >
            <Box sx={{ pb: '1rem' }}>
              <Typography variant="h3">{username}'s Analytics</Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item lg={6} md={12} xl={6} xs={12}>
                <UserOverview />
              </Grid>
              <Grid item lg={6} md={12} xl={6} xs={12}>
                <AnalyticDetails sx={{ height: '100%' }} />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <AveragePace sx={{ height: '100%' }} />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <DisfluencyTotalWord sx={{ height: '100%' }} />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <DisfluencyClipDuration sx={{ height: '100%' }} />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <SilenceClipDuration sx={{ height: '100%' }} />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <SilenceDisfluencyDuration sx={{ height: '100%' }} />
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
    </>
  );
};

export default UserAnalytics;
