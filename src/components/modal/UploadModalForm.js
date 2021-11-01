import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@material-ui/core';
import UploadModalFormSelect from './UploadModalFormSelect';
import ReactPlayer from 'react-player';

const UploadModalForm = (props) => {
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
        console.log(values);
        let formData = new FormData();
        formData.append('file', values.file);
        try {
          if (!values.file) {
            console.log('choosing file');
          } else {
            console.log('submitted values:', values);
            // dispatch(addItems(formData));
            props.handleSuccessModal();
          }
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
            onChange={(event) => {
              setFieldValue('blob', URL.createObjectURL(event.target.files[0]));
              setFieldValue('file', event.target.files[0]);
              setFieldValue('name', event.target.files[0].name);
            }}
          />
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
              <source src={URL.createObjectURL(props.file)} type="audio/mp4" />
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
              <UploadModalFormSelect
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
              <Button
                type="submit"
                disabled={isLoading}
                variant="contained"
                color="primary"
                autoFocus
              >
                {isLoading ? 'Uploading' : 'Upload'}
              </Button>
            </>
          )}
        </form>
      )}
    </Formik>
  );
};

export default UploadModalForm;
