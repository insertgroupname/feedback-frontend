import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { closeUpdateFailModal } from 'src/redux/actions/modalActions';

const UpdateModalFail = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal);
  const { showUpdateFailModal } = modalState;

  const closeHandler = () => {
    dispatch(closeUpdateFailModal());
  };

  return (
    <Dialog
      open={showUpdateFailModal}
      onClose={closeHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" disableTypography>
        <Typography variant="h3">Update Failure</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please check you condition and try it again
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ padding: '16px 24px' }}>
        <Button onClick={closeHandler} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModalFail;
