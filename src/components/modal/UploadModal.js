import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import SuccessModal from './SuccessModal';
import FailModal from './FailModal';
import UploadModalForm from './UploadModalForm';
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
        onClose={handleCloseUpload}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" disableTypography>
          <Typography variant="h3">Upload a Video / Sound</Typography>
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: '16px' }}>
          <UploadModalForm
            handleSuccessModal={handleSuccessModal}
            handleFailModal={handleFailModal}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadModal;
