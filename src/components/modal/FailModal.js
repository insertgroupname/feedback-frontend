import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';

const FailModal = (props) => {
  return (
    <>
      <Dialog
        open={props.showFailModal}
        onClose={props.handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" disableTypography>
          <Typography variant="h3">Upload Failed</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Upload file error, please try again
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: '16px 24px' }}>
          <Button onClick={props.handleModalClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FailModal;
