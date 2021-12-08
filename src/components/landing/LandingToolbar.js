import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import UploadIcon from '@material-ui/icons/Upload';
import { openHelpModal, openUploadModal } from 'src/redux/actions/modalActions';
import HelpIcon from '@material-ui/icons/Help';

const LandingToolbar = (props) => {
  const dispatch = useDispatch();
  const openUploadModalHandler = () => {
    dispatch(openUploadModal());
  };

  const openHelpModalHandler = () => {
    dispatch(openHelpModal());
  };
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h3">Welcome, {props.username}</Typography>
          <Tooltip title="Help">
            <IconButton color="primary" onClick={openHelpModalHandler}>
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </Box>
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
