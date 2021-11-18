import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import {
  Box,
  Container,
  CircularProgress,
  Grid,
  Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import UserBaselineCard from 'src/components/admin/UserBaselineCard';
import { getAllBaseline } from 'src/redux/actions/adminActions';
import UserPaceCard from 'src/components/admin/UserPaceCard';
import UserDisfluencyCard from 'src/components/admin/UserDisfluencyCard';

const Admin = () => {
  const dispatch = useDispatch();

  const settingsState = useSelector((state) => state.settings);
  const { type } = settingsState;

  const adminState = useSelector((state) => state.admin);
  const { isLoading, allUserBaseline } = adminState;

  useEffect(() => {
    if (type === 'admin' && allUserBaseline.length === 0) {
      dispatch(getAllBaseline());
    }
  }, [dispatch, type, allUserBaseline.length]);

  return (
    <>
      <Helmet>
        <title>Feedback | Admin</title>
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
        ) : (
          <Container
            maxWidth={false}
            sx={{
              py: 3
            }}
          >
            <Typography
              sx={{
                pb: 2
              }}
              variant="h3"
            >
              Admin Dashboard
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <UserPaceCard />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <UserDisfluencyCard />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <UserBaselineCard />
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
    </>
  );
};

export default Admin;
