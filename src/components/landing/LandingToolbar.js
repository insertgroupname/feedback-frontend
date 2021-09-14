import { Box, Button, Typography } from '@material-ui/core';
import axios from 'axios';

const LandingToolbar = (props) => {
  const userId = '0000';

  const handleFile = async (e) => {
    let file = e.target.files[0];
    let formData = new FormData();

    formData.append('userId', userId);
    formData.append('file', file);

    try {
      if (!file) {
        console.log('choosing file');
      } else {
        const res = await axios.post(
          'http://10.4.56.44:81/api/v1/upload',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );
        console.log(res.data);
      }
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
    }
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h3">Welcome, User fullname</Typography>
        <input
          accept=".mkv,.mp4,.flv,.flac,.mp3"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={(e) => {
            handleFile(e);
          }}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload More Video
          </Button>
        </label>
      </Box>
    </Box>
  );
};

export default LandingToolbar;
