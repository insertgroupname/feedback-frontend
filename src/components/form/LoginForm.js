import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { login, resetLogin } from 'src/redux/actions/authActions';

import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  Alert
} from '@material-ui/core';

const LoginForm = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authentication);
  const { isLoading, error } = authState;

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values) => {
        dispatch(login(values.email, values.password));
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <Typography color="textPrimary" variant="h2">
              Sign in
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              To build your dashboard with your rehearsal
            </Typography>
          </Box>
          {error && (
            <Alert severity="error" onClose={() => dispatch(resetLogin())}>
              {error}
            </Alert>
          )}
          <TextField
            error={Boolean(touched.email && errors.email)}
            autoComplete="off"
            fullWidth
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            autoComplete="off"
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              disabled={isLoading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Login now
            </Button>
          </Box>
          <Typography color="textSecondary" variant="body1">
            Don&apos;t have an account?{' '}
            <Link component={RouterLink} to="/register" variant="h6">
              Register
            </Link>
          </Typography>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
