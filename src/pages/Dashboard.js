import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import AveragePace from 'src/components/dashboard/AveragePace';
import Pace from 'src/components/dashboard/Pace';
import Fillers from 'src/components/dashboard/Fillers';
import FillersChart from 'src/components/dashboard/FillersChart';
import RepetitionWords from 'src/components/dashboard/RepetitionWords';
import Vocabulary from 'src/components/dashboard/Vocabulary';
import Keyword from 'src/components/dashboard/Keyword';
import Transcript from 'src/components/dashboard/Transcript';
import SoundDetail from 'src/components/dashboard/SoundDetail';
import Soundwave from 'src/components/dashboard/Soundwave';
import { getItemDetail, resetItem } from 'src/redux/actions/itemsActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  let { videoUUID } = useParams();

  const authState = useSelector((state) => state.authentication);
  const { userId } = authState;

  const itemDetailState = useSelector((state) => state.itemDetail);
  const { isLoading, item } = itemDetailState;

  useEffect(() => {
    if (userId) {
      dispatch(getItemDetail(userId, videoUUID));
    }
    return () => {
      dispatch(resetItem());
    };
  }, [dispatch, userId, videoUUID]);

  return (
    <>
      <Helmet>
        <title>Feedback | Dashboard</title>
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
            <Typography variant="h3" style={{ paddingBottom: '1rem' }}>
              {item.videoName}
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={9} md={12} xl={9} xs={12}>
                <Soundwave />
              </Grid>
              <Grid item lg={3} md={12} xl={3} xs={12}>
                <SoundDetail sx={{ height: '100%' }} />
              </Grid>
              <Grid item lg={8} md={12} xl={8} xs={12}>
                <AveragePace sx={{ height: '100%' }} />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <Pace sx={{ height: '100%' }} />
              </Grid>
              <Grid item lg={6} md={12} xl={6} xs={12}>
                <Fillers sx={{ height: '100%' }} />
              </Grid>
              <Grid item lg={6} md={12} xl={6} xs={12}>
                <FillersChart />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <RepetitionWords />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <Vocabulary />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <Keyword />
              </Grid>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <Transcript />
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
