import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import { deleteItem } from 'src/redux/actions/itemsActions';

const ConfirmModal = (props) => {
  const dispatch = useDispatch();

  const handleDelete = (videoUUID) => {
    try {
      dispatch(deleteItem(videoUUID));
      props.handleCloseConfirmModal();
      props.handleClose();
      props.handleDeleteSuccessModal();
    } catch (error) {
      props.handleCloseConfirmModal();
      props.handleClose();
      props.handleDeleteFailModal();
    }
  };
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleCloseConfirmModal}
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
          <Button
            onClick={props.handleCloseConfirmModal}
            color="primary"
            autoFocus
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(props.videoUUID)}
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
