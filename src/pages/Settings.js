import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
// import SettingsNotifications from 'src/components/settings/SettingsNotifications';
// import SettingsPassword from 'src/components/settings/SettingsPassword';
import SettingsStopword from 'src/components/settings/SettingsStopword';
import SettingsTags from 'src/components/settings/SettingsTag';

const SettingsView = () => (
  <>
    <Helmet>
      <title>Feedback | Setting</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        {/* <SettingsNotifications /> */}
        {/* <SettingsPassword /> */}
        <Box sx={{ pt: 3 }}>
          <SettingsStopword />
        </Box>
        <Box sx={{ pt: 3 }}>
          <SettingsTags />
        </Box>
      </Container>
    </Box>
  </>
);

export default SettingsView;
