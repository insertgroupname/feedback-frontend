import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Box, Container, CircularProgress } from '@material-ui/core';
import SettingsStopword from 'src/components/settings/SettingsStopword';
import SettingsTags from 'src/components/settings/SettingsTag';
import { getSettings } from 'src/redux/actions/settingsActions';

const SettingsView = () => {
  const dispatch = useDispatch();
  const settingsState = useSelector((state) => state.settings);

  const { isLoading } = settingsState;

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Feedback | Setting</title>
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
          <Container maxWidth="lg">
            <Box sx={{ pt: 3 }}>
              <SettingsStopword />
            </Box>
            <Box sx={{ pt: 3 }}>
              <SettingsTags />
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
};

export default SettingsView;
