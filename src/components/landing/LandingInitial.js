import { Box, Typography, Button, Paper } from '@material-ui/core';
import UploadModal from '../modal/UploadModal';

const LandingInitial = (props) => {
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
          onClick={props.handleClickOpen}
        >
          Upload a video
        </Button>
      </Paper>
      <UploadModal open={props.open} handleClose={props.handleClose} />
    </Box>
  );
};

export default LandingInitial;
