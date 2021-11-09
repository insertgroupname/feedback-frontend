import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box } from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import FormSelect from './FormSelect';
import { updateItem } from 'src/redux/actions/itemsActions';
import {
  openConfirmModal,
  openEditFailModal,
  openEditSuccessModal
} from 'src/redux/actions/modalActions';

const EditForm = () => {
  const dispatch = useDispatch();
  const itemsState = useSelector((state) => state.items);
  const { items, isUpdating, isDeleting } = itemsState;

  const modalState = useSelector((state) => state.modal);
  const { videoUUID } = modalState;

  const openConfirmModalHandler = () => {
    dispatch(openConfirmModal());
  };

  let matchItem = [];
  if (items) {
    matchItem = items.filter((item) => {
      return item.videoUUID === videoUUID;
    });
  }

  return (
    <Formik
      initialValues={{
        name: matchItem[0] ? matchItem[0].videoName : '',
        description: matchItem[0] ? matchItem[0].description : '',
        tags: matchItem[0] ? matchItem[0].tags : []
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('Name is required'),
        description: Yup.string().max(255)
      })}
      onSubmit={async (values) => {
        try {
          const item = {
            videoUUID: videoUUID,
            videoName: values.name,
            description: values.description,
            tags: values.tags
          };
          dispatch(updateItem(item));
          dispatch(openEditSuccessModal());
        } catch (error) {
          dispatch(openEditFailModal());
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
        setFieldValue
      }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            error={Boolean(touched.name && errors.name)}
            fullWidth
            helperText={touched.name && errors.name}
            label="Name"
            margin="normal"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.name}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.description && errors.description)}
            fullWidth
            helperText={touched.description && errors.description}
            label="Description"
            margin="normal"
            name="description"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.description}
            variant="outlined"
          />
          <FormSelect
            error={Boolean(touched.tags && errors.tags)}
            tags={values.tags}
            handleFieldChange={(event) =>
              setFieldValue('tags', event.target.value)
            }
            handleDelete={(event, value) => {
              event.preventDefault();
              setFieldValue(
                'tags',
                values.tags.filter((tag) => {
                  return tag !== value;
                })
              );
            }}
          />
          <Box
            sx={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'flex-end',
              py: '1rem'
            }}
          >
            <Button
              type="submit"
              disabled={isUpdating}
              variant="contained"
              color="primary"
              autoFocus
              startIcon={<UpdateIcon />}
            >
              {isUpdating ? 'Updating' : 'Update'}
            </Button>
            <Button
              onClick={openConfirmModalHandler}
              disabled={isDeleting}
              variant="contained"
              color="error"
              autoFocus
              startIcon={<DeleteIcon />}
            >
              {isDeleting ? 'Deleting' : 'Delete'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default EditForm;
