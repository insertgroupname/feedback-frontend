import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  CircularProgress
} from '@material-ui/core';
import DisfluencyClipDuration from 'src/components/analytics/DisfluencyClipDuration';
import {
  getAllBaseline,
  getAnalytics
} from 'src/redux/actions/analyticsReducer';

const UserAnalytics = () => {
  const dispatch = useDispatch();

  const settingsState = useSelector((state) => state.settings);
  const { isLoading: isSettingsLoading, username, error, tags } = settingsState;

  const analyticsState = useSelector((state) => state.analytics);
  const {
    analytics,
    isLoading: isAnalyticsLoading,
    isBaselineLoading,
    baselines
  } = analyticsState;

  const [tag, setTag] = useState('all');

  const handleChange = (event) => {
    setTag(event.target.value);
  };

  useEffect(() => {
    dispatch(getAnalytics(tag));
    dispatch(getAllBaseline());
  }, [dispatch, tag]);

  const wpm =
    analytics && analytics.allVideoAnalytic
      ? analytics.allVideoAnalytic.wpm
      : [];

  const disfluencyPerTotalWord =
    analytics && analytics.allVideoAnalytic
      ? analytics.allVideoAnalytic.disfluencyPerTotalWord
      : [];

  const disfluencyPerVideoLength =
    analytics && analytics.allVideoAnalytic
      ? analytics.allVideoAnalytic.disfluencyPerVideoLength
      : [];

  const silencePerVideoLength =
    analytics && analytics.allVideoAnalytic
      ? analytics.allVideoAnalytic.silencePerVideoLength
      : [];

  const disfluencyPerSilence =
    analytics && analytics.allVideoAnalytic
      ? analytics.allVideoAnalytic.disfluencyPerSilence
      : [];

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
        {isSettingsLoading || (isBaselineLoading && isAnalyticsLoading) ? (
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                pb: '1rem',
                justifyContent: 'space-between'
              }}
            >
              <Typography variant="h3">{username}'s Analytics</Typography>
              <Card
                sx={{
                  width: 'fit-content'
                }}
              >
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="filterTag">Filter Tag</InputLabel>
                  <Select
                    labelId="filterTag"
                    id="filterTag"
                    value={tag}
                    onChange={handleChange}
                    autoWidth
                    label="Tag"
                  >
                    <MenuItem value="all">All</MenuItem>
                    {tags.map((ele, index) => (
                      <MenuItem key={index} value={ele}>
                        {ele}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Card>
            </Box>
            <Grid container spacing={3}>
              <Grid item lg={6} md={12} xl={6} xs={12}>
                <UserOverview score={analytics.scoringResult} />
              </Grid>
              <Grid item lg={6} md={12} xl={6} xs={12}>
                <AnalyticDetails sx={{ height: '100%' }} />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <AveragePace
                  wpm={wpm}
                  baseline={baselines.avgWPM}
                  sx={{ height: '100%' }}
                />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <DisfluencyTotalWord
                  data={disfluencyPerTotalWord}
                  baseline={baselines.avgDisfluencyCount}
                  sx={{ height: '100%' }}
                />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <DisfluencyClipDuration
                  data={disfluencyPerVideoLength}
                  sx={{ height: '100%' }}
                />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <SilenceClipDuration
                  data={silencePerVideoLength}
                  sx={{ height: '100%' }}
                />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <SilenceDisfluencyDuration
                  data={disfluencyPerSilence}
                  sx={{ height: '100%' }}
                />
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
    </>
  );
};

export default UserAnalytics;
