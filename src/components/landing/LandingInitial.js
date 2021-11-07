import { Box, Typography, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import UploadIcon from '@material-ui/icons/Upload';
import { openUploadModal } from 'src/redux/actions/modalActions';

const LandingInitial = () => {
  const dispatch = useDispatch();
  const openUploadModalHandler = () => {
    dispatch(openUploadModal());
  };

  return (
    <Box
      sx={{
        height: '80vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper
        sx={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem'
        }}
        variant="outlined"
      >
        <Typography variant="h3" fontWeight="400">
          Upload Your First Rehearal or Presentation
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={openUploadModalHandler}
          startIcon={<UploadIcon />}
        >
          Upload a video
        </Button>
      </Paper>
    </Box>
  );
};

export default LandingInitial;
