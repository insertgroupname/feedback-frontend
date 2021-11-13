// import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import SuccessFailModal from './SuccessFailModal';
import EditForm from '../form/EditForm';
import ConfirmModal from './ConfirmModal';
import { closeEditModal } from 'src/redux/actions/modalActions';

const EditModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal);
  const {
    showEditModal,
    showEditSuccessModal,
    showEditFailModal,
    showConfirmModal,
    showDeleteSuccessModal,
    showDeleteFailModal
  } = modalState;

  const itemsState = useSelector((state) => state.items);
  const { isUpdating, isDeleting } = itemsState;

  const closeEditModalHandler = () => {
    dispatch(closeEditModal());
  };

  return (
    <>
      {showEditSuccessModal && !isUpdating && (
        <SuccessFailModal
          title="Update Successful"
          description="Click Argee button to check the result"
        />
      )}
      {showEditFailModal && !isUpdating && (
        <SuccessFailModal
          title="Update Failure"
          description="Update error, please try again"
        />
      )}
      {showConfirmModal && (
        <ConfirmModal
          title="Are you sure?"
          description="Do you really want to delete these records? This process cannot be undone"
        />
      )}
      {showDeleteSuccessModal && !isDeleting && (
        <SuccessFailModal
          title="Delete Successful"
          description="The video has been deleted"
        />
      )}
      {showDeleteFailModal && !isDeleting && (
        <SuccessFailModal
          title="Delete Failure"
          description="Delete error, please try again"
        />
      )}
      <Dialog
        open={showEditModal}
        onClose={() => closeEditModalHandler()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" disableTypography>
          <Typography variant="h3">Edit Video Information</Typography>
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: '16px' }}>
          <EditForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditModal;
