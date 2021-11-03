import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box } from '@material-ui/core';
import UploadIcon from '@material-ui/icons/Upload';
import FormSelect from './FormSelect';
import ReactPlayer from 'react-player';

const UploadForm = (props) => {
  const itemsState = useSelector((state) => state.items);
  const { isLoading } = itemsState;

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        tags: [],
        blob: null,
        file: null
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('Name is required'),
        description: Yup.string().max(255),
        file: Yup.mixed().required()
      })}
      onSubmit={async (values) => {
        let formData = new FormData();
        formData.append('file', values.file);
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
          <input
            accept=".mkv,.mp4,.flv,.flac,.mp3"
            id="file"
            name="file"
            type="file"
            hidden
            onChange={(event) => {
              if (event.target.files.length > 0) {
                setFieldValue(
                  'blob',
                  URL.createObjectURL(event.target.files[0])
                );
                setFieldValue('file', event.target.files[0]);
                setFieldValue('name', event.target.files[0].name);
              } else {
                setFieldValue('blob', null);
                setFieldValue('file', null);
                setFieldValue('name', '');
              }
            }}
          />
          <label
            htmlFor="file"
            style={{
              background: '#5664d2',
              color: 'white',
              padding: '0.5rem',
              fontFamily: 'sans-serif',
              borderRadius: '0.3rem',
              cursor: 'pointer',
              margin: '1rem 0.5rem 0 0'
            }}
          >
            Choose File
          </label>
          {values.file && <span>{values.file.name}</span>}
          {values.file && values.file.type.match('video.*') && (
            <div style={{ paddingTop: '1rem' }}>
              <ReactPlayer
                url={values.blob}
                width="100%"
                height="100%"
                controls={true}
              />
            </div>
          )}
          {values.file && values.file.type.match('audio.*') && (
            <audio
              controls
              style={{
                width: '100%',
                paddingTop: '1rem'
              }}
            >
              <source src={values.blob} type="audio/mp4" />
            </audio>
          )}
          {values.file && (
            <>
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
            </>
          )}
        </form>
      )}
    </Formik>
  );
};

export default UploadForm;