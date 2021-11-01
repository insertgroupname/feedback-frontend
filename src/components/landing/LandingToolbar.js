import { Box, Button, Typography } from '@material-ui/core';
import UploadModal from '../modal/UploadModal';

const LandingToolbar = (props) => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h3">Welcome, User fullname</Typography>
        {props.itemLength > 0 && (
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={props.handleClickOpen}
          >
            Upload More Video
          </Button>
        )}
      </Box>
      <UploadModal open={props.open} handleClose={props.handleClose} />
    </Box>
  );
};

export default LandingToolbar;
