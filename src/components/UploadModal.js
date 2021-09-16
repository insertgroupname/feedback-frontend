import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';
import SuccessModal from './SuccessModal';
import axios from 'axios';

const UploadModal = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);

  const handleModalClose = () => {
    setShowSuccessModal(false);
    props.handleClose();
    window.location.reload();
  };

  const userId = '0000';
  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', props.file);
    try {
      if (!props.file) {
        console.log('choosing file');
      } else {
        setIsSubmitting(true);
        const res = await axios.post(
          'http://10.4.56.44:81/api/v1/upload',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );
        console.log(res.data);
        setIsSubmitting(false);
        setShowSuccessModal(true);
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
      setIsSubmitting(false);
      setShowFailModal(false);
    }
  };
  return (
    <>
      {showSuccessModal ? (
        <SuccessModal
          showSuccessModal={showSuccessModal}
          handleModalClose={handleModalClose}
        />
      ) : (
        <>
          <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" disableTypography>
              <Typography variant="h3">Select your video or sound</Typography>
            </DialogTitle>
            <DialogContent>
              <input
                accept=".mkv,.mp4,.flv,.flac,.mp3"
                type="file"
                onChange={(e) => {
                  props.handleFile(e);
                }}
              />
              {props.file && props.file.type.match('video.*') && (
                <div style={{ paddingTop: '1rem' }}>
                  <ReactPlayer
                    url={URL.createObjectURL(props.file)}
                    width="100%"
                    height="100%"
                    controls={true}
                  />
                </div>
              )}
              {props.file && props.file.type.match('audio.*') && (
                <audio
                  controls
                  style={{
                    width: '100%',
                    paddingTop: '1rem'
                  }}
                >
                  <source
                    src={URL.createObjectURL(props.file)}
                    type="audio/mp4"
                  />
                </audio>
              )}
            </DialogContent>
            <DialogActions style={{ padding: '16px 24px' }}>
              <Button
                disabled={isSubmitting}
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                autoFocus
              >
                {isSubmitting ? 'Uploading' : 'Upload'}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};

export default UploadModal;
