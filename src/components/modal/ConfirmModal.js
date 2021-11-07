import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import { deleteItem } from 'src/redux/actions/itemsActions';
import {
  closeConfirmModal,
  closeEditModal,
  openDeleteFailModal,
  openDeleteSuccessModal
} from 'src/redux/actions/modalActions';

const ConfirmModal = (props) => {
  const dispatch = useDispatch();

  const modalState = useSelector((state) => state.modal);
  const { videoUUID, showConfirmModal } = modalState;

  const closeConfirmModalHandler = () => {
    dispatch(closeConfirmModal());
  };

  const deleteItemHandler = (videoUUID) => {
    try {
      dispatch(deleteItem(videoUUID));
      closeConfirmModalHandler();
      dispatch(closeEditModal());
      dispatch(openDeleteSuccessModal());
    } catch (error) {
      closeConfirmModalHandler();
      dispatch(closeEditModal());
      dispatch(openDeleteFailModal());
    }
  };
  return (
    <>
      <Dialog
        open={showConfirmModal}
        onClose={closeConfirmModalHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" disableTypography>
          <Typography variant="h3">{props.title}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{props.description}</DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: '16px 24px' }}>
          <Button onClick={closeConfirmModalHandler} color="primary" autoFocus>
            Cancel
          </Button>
          <Button
            onClick={() => deleteItemHandler(videoUUID)}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmModal;
