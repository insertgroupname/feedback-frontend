import { Box, Button, Typography } from '@material-ui/core';
import UploadModal from '../modal/UploadModal';
import UploadIcon from '@material-ui/icons/Upload';

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
            startIcon={<UploadIcon />}
          >
            Upload More Video
          </Button>
        )}
      </Box>
      {props.itemLength > 0 && (
        <UploadModal open={props.open} handleClose={props.handleClose} />
      )}
    </Box>
  );
};

export default LandingToolbar;
