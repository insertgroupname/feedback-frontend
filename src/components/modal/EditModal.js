import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import SuccessFailModal from './SuccessFailModal';
import EditForm from '../form/EditForm';
import ConfirmModal from './ConfirmModal';
const EditModal = (props) => {
  const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false);
  const [showUpdateFailModal, setShowUpdateFailModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showDeleteFailModal, setShowDeleteFailModal] = useState(false);

  const handleModalClose = () => {
    setShowUpdateSuccessModal(false);
    setShowUpdateFailModal(false);
    setShowDeleteSuccessModal(false);
    setShowDeleteFailModal(false);
  };

  const handleUpdateSuccessModal = () => {
    setShowUpdateSuccessModal(true);
  };

  const handleUpdateFailModal = () => {
    setShowUpdateFailModal(true);
  };

  const handleOpenConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleDeleteSuccessModal = () => {
    setShowDeleteSuccessModal(true);
  };

  const handleDeleteFailModal = () => {
    setShowDeleteFailModal(true);
  };

  return (
    <>
      {showUpdateSuccessModal && (
        <SuccessFailModal
          title="Update Successful"
          description="Click Argee button to check the result"
          open={showUpdateSuccessModal}
          handleModalClose={handleModalClose}
        />
      )}
      {showUpdateFailModal && (
        <SuccessFailModal
          title="Update Failure"
          description="Update error, please try again"
          open={showUpdateFailModal}
          handleModalClose={handleModalClose}
        />
      )}
      {showConfirmModal && (
        <ConfirmModal
          videoUUID={props.videoUUID}
          title="Are you sure?"
          description="Do you really want to delete these records? This process cannot be undone"
          open={showConfirmModal}
          handleCloseConfirmModal={handleCloseConfirmModal}
          handleDeleteSuccessModal={handleDeleteSuccessModal}
          handleDeleteFailModal={handleDeleteFailModal}
          handleClose={() => props.handleClose()}
        />
      )}
      {showDeleteSuccessModal && (
        <SuccessFailModal
          title="Delete Successful"
          description="The video has been deleted"
          open={showDeleteSuccessModal}
          handleModalClose={handleModalClose}
        />
      )}
      {showDeleteFailModal && (
        <SuccessFailModal
          title="Delete Failure"
          description="Delete error, please try again"
          open={showDeleteFailModal}
          handleModalClose={handleModalClose}
        />
      )}
      <Dialog
        open={props.open}
        onClose={() => props.handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" disableTypography>
          <Typography variant="h3">Edit</Typography>
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: '16px' }}>
          <EditForm
            videoUUID={props.videoUUID}
            handleUpdateSuccessModal={handleUpdateSuccessModal}
            handleUpdateFailModal={handleUpdateFailModal}
            handleOpenConfirmModal={handleOpenConfirmModal}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditModal;
