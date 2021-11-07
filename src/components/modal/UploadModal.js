import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import SuccessFailModal from './SuccessFailModal';
import UploadForm from '../form/UploadForm';
import { useSelector, useDispatch } from 'react-redux';
import { closeUploadModal } from 'src/redux/actions/modalActions';
const UploadModal = () => {
  const dispatch = useDispatch();

  const modalState = useSelector((state) => state.modal);
  const { showUploadModal, showUploadSuccessModal, showUploadFailModal } =
    modalState;

  const closeUploadModalHandler = () => {
    dispatch(closeUploadModal());
  };

  return (
    <>
      {showUploadSuccessModal && (
        <SuccessFailModal
          title="Upload Successful"
          description="The system is processing your file, please wait for a few minutes"
        />
      )}
      {showUploadFailModal && (
        <SuccessFailModal
          title="Upload Failure"
          description="Upload file error, please try again"
        />
      )}
      <Dialog
        open={showUploadModal}
        onClose={closeUploadModalHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" disableTypography>
          <Typography variant="h3">Upload a Video / Sound</Typography>
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: '16px' }}>
          <UploadForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadModal;
