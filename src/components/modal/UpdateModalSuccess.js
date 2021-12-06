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
import { closeUpdateSuccessModal } from 'src/redux/actions/modalActions';

const UpdateModalSuccess = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal);
  const { showUpdateSuccessModal } = modalState;

  const closeHandler = () => {
    dispatch(closeUpdateSuccessModal());
  };

  return (
    <Dialog
      open={showUpdateSuccessModal}
      onClose={closeHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" disableTypography>
        <Typography variant="h3">Update Successful</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>The standard line was updated</DialogContentText>
      </DialogContent>
      <DialogActions style={{ padding: '16px 24px' }}>
        <Button onClick={closeHandler} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModalSuccess;
