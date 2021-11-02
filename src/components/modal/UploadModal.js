import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import SuccessFailModal from './SuccessFailModal';
import UploadForm from '../form/UploadForm';
const UploadModal = (props) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);

  const handleCloseUpload = () => {
    props.handleClose();
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setShowFailModal(false);
    handleCloseUpload();
  };

  const handleSuccessModal = () => {
    setShowSuccessModal(true);
  };

  const handleFailModal = () => {
    setShowFailModal(true);
  };

  return (
    <>
      {showSuccessModal && (
        <SuccessFailModal
          title="Upload Successful"
          description="The system is processing your file, please wait for a few minutes"
          open={showSuccessModal}
          handleModalClose={handleModalClose}
        />
      )}
      {showFailModal && (
        <SuccessFailModal
          title="Upload Failure"
          description="Upload file error, please try again"
          open={showFailModal}
          handleModalClose={handleModalClose}
        />
      )}
      <Dialog
        open={props.open}
        onClose={handleCloseUpload}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" disableTypography>
          <Typography variant="h3">Upload a Video / Sound</Typography>
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: '16px' }}>
          <UploadForm
            handleSuccessModal={handleSuccessModal}
            handleFailModal={handleFailModal}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadModal;
