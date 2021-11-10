import { Helmet } from 'react-helmet';
import { Box, Container, Grid, CircularProgress } from '@material-ui/core';
import LandingToolbar from '../components/landing/LandingToolbar';
import LandingCard from 'src/components/landing/LandingCard';
import { useDispatch, useSelector } from 'react-redux';
import LandingInitial from 'src/components/landing/LandingInitial';
import EditModal from '../components/modal/EditModal';
import ServerDown from './ServerDown';
import UploadModal from '../components/modal/UploadModal';
import { openEditModal } from 'src/redux/actions/modalActions';

const Landing = () => {
  const dispatch = useDispatch();

  const openEditModalHandler = (videoUUID) => {
    dispatch(openEditModal(videoUUID));
  };

  const itemsState = useSelector((state) => state.items);
  const { isLoading: isItemLoading, items, error } = itemsState;

  const settingsState = useSelector((state) => state.settings);
  const { isLoading: isSettingLoading, username } = settingsState;

  return (
    <>
      <Helmet>
        <title>Feedback | Landing</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          height: '100%'
        }}
      >
        {isItemLoading && isSettingLoading ? (
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
            <LandingToolbar username={username} itemLength={items.length} />
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {items.length > 0 ? (
                  items.map((item) => (
                    <Grid item key={item.videoUUID} lg={4} md={6} xs={12}>
                      <LandingCard
                        item={item}
                        openEditModalHandler={() =>
                          openEditModalHandler(item.videoUUID)
                        }
                      />
                    </Grid>
                  ))
                ) : (
                  <LandingInitial />
                )}
              </Grid>
            </Box>
          </Container>
        )}
      </Box>
      <UploadModal />
      <EditModal />
    </>
  );
};

export default Landing;
