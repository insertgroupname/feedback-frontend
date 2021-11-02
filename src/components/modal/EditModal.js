import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import SuccessFailModal from './SuccessFailModal';
import EditForm from '../form/EditForm';
const EditModal = (props) => {
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
          title="Update Successful"
          description="Click Argee button to check the result"
          open={showSuccessModal}
          handleModalClose={handleModalClose}
        />
      )}
      {showFailModal && (
        <SuccessFailModal
          title="Update Failure"
          description="Update error, please try again"
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
          <Typography variant="h3">Edit</Typography>
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: '16px' }}>
          <EditForm
            videoUUID={props.videoUUID}
            handleSuccessModal={handleSuccessModal}
            handleFailModal={handleFailModal}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditModal;
