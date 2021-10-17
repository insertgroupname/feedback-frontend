import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';
import SuccessModal from './SuccessModal';
import FailModal from './FailModal';
import { addItems } from 'src/redux/actions/itemsActions';

const UploadModal = (props) => {
  const dispatch = useDispatch();
  const itemsState = useSelector((state) => state.items);
  const { isLoading } = itemsState;

  const authState = useSelector((state) => state.authentication);
  const { userId } = authState;

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setShowFailModal(false);
    props.handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', props.file);
    try {
      if (!props.file) {
        console.log('choosing file');
      } else {
        dispatch(addItems(formData));
        setShowSuccessModal(true);
      }
    } catch (error) {
      setShowFailModal(true);
    }
  };

  return (
    <>
      {showSuccessModal && (
        <SuccessModal
          showSuccessModal={showSuccessModal}
          handleModalClose={handleModalClose}
        />
      )}
      {showFailModal && (
        <FailModal
          showFailModal={showFailModal}
          handleModalClose={handleModalClose}
        />
      )}
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
              <source src={URL.createObjectURL(props.file)} type="audio/mp4" />
            </audio>
          )}
        </DialogContent>
        <DialogActions style={{ padding: '16px 24px' }}>
          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            autoFocus
          >
            {isLoading ? 'Uploading' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadModal;
