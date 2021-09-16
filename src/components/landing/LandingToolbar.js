import { useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import UploadModal from '../UploadModal';

const LandingToolbar = (props) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFile();
  };

  const handleFile = async (e) => {
    let file = e.target.files[0];
    setFile(file);
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
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={handleClickOpen}
        >
          Upload More Video
        </Button>
      </Box>
      <UploadModal
        open={open}
        handleClose={handleClose}
        handleFile={handleFile}
        setuser={props.setuser}
        file={file}
      />
    </Box>
  );
};

export default LandingToolbar;
