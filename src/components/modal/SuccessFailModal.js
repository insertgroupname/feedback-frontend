import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import {
  closeUploadModal,
  closeSuccessFailModal,
  closeEditModal
} from 'src/redux/actions/modalActions';

const SuccessFailModal = (props) => {
  const dispatch = useDispatch();

  const closeAllModalHandler = () => {
    dispatch(closeSuccessFailModal());
    dispatch(closeUploadModal());
    dispatch(closeEditModal());
  };

  return (
    <Dialog
      open={true}
      onClose={closeAllModalHandler}
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
        <Button onClick={closeAllModalHandler} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessFailModal;
