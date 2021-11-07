import { Box, Button, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import UploadIcon from '@material-ui/icons/Upload';
import { openUploadModal } from 'src/redux/actions/modalActions';

const LandingToolbar = (props) => {
  const dispatch = useDispatch();
  const openUploadModalHandler = () => {
    dispatch(openUploadModal());
  };
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
            onClick={openUploadModalHandler}
            startIcon={<UploadIcon />}
          >
            Upload More Video
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default LandingToolbar;
