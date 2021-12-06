import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import { closeHelpModal } from 'src/redux/actions/modalActions';

const useStyles = makeStyles((theme) => ({
  dialogContentContainer: {
    maxWidth: 1060
  },
  imgContainer: {
    maxWidth: 1000,
    marginBottom: 16,
    [theme.breakpoints.down('lg')]: {
      maxWidth: 800
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: 500
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: 400
    }
  }
}));

const HelpModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const modalState = useSelector((state) => state.modal);
  const { showHelpModal } = modalState;

  const handleClose = () => {
    dispatch(closeHelpModal());
  };

  return (
    <>
      <Dialog
        maxWidth="xl"
        open={showHelpModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" disableTypography>
          <Typography variant="h3">Help Center</Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContentContainer}>
          <DialogContentText>
            1. Click upload button to upload new video clip
          </DialogContentText>
          <img
            className={classes.imgContainer}
            src="/static/images/click_upload.png"
            alt="click_upload"
          />
          <DialogContentText>
            2. Select file with allowed type
          </DialogContentText>
          <img
            className={classes.imgContainer}
            src="/static/images/click_choose_file.png"
            alt="click_choose_file"
          />
          <DialogContentText>
            3. Insert name, description, and tag as desired
          </DialogContentText>
          <img
            className={classes.imgContainer}
            src="/static/images/insert_text.png"
            alt="insert_text"
          />
          <DialogContentText>
            4. Click upload button to finish
          </DialogContentText>
          <img
            className={classes.imgContainer}
            src="/static/images/click_upload2.png"
            alt="click_upload2"
          />
        </DialogContent>
        <DialogActions style={{ padding: '16px 24px' }}>
          <Button onClick={handleClose} color="primary" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HelpModal;
