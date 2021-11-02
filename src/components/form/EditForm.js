import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box } from '@material-ui/core';
import UploadIcon from '@material-ui/icons/Upload';
import FormSelect from './FormSelect';

const EditForm = (props) => {
  const itemsState = useSelector((state) => state.items);
  const { items, isLoading } = itemsState;

  const matchItem = items.filter((item) => {
    return item.videoUUID === props.videoUUID;
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: matchItem[0].videoName,
        description: '',
        tags: []
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('Name is required'),
        description: Yup.string().max(255)
      })}
      onSubmit={async (values) => {
        try {
          console.log('submitted values:', values);
          // dispatch(addItems(formData));
          props.handleSuccessModal();
        } catch (error) {
          props.handleFailModal();
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
              py: '1rem',
              float: 'right'
            }}
          >
            <Button
              type="submit"
              disabled={isLoading}
              variant="contained"
              color="primary"
              autoFocus
              startIcon={<UploadIcon />}
            >
              {isLoading ? 'Uploading' : 'Upload'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default EditForm;
