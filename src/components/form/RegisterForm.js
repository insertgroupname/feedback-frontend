import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { register, resetRegister } from 'src/redux/actions/authActions';

import {
  Alert,
  Box,
  Button,
  Link,
  TextField,
  Typography
} from '@material-ui/core';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authentication);
  const { isLoading, error } = authState;
  return (
    <Formik
      initialValues={{
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        username: Yup.string().max(255).required('Username is required'),
        password: Yup.string().max(255).required('Password is required'),
        confirmPassword: Yup.string().when('password', {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref('password')],
            'Password and Confirm Password does not match'
          )
        })
      })}
      onSubmit={async (values) => {
        dispatch(register(values.email, values.password, values.username));
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
              Create new account
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Use your email to create new account
            </Typography>
          </Box>
          {error && (
            <Alert severity="error" onClose={() => dispatch(resetRegister())}>
              {error}
            </Alert>
          )}
          <TextField
            error={Boolean(touched.username && errors.username)}
            autoComplete="off"
            fullWidth
            helperText={touched.username && errors.username}
            label="Username"
            margin="normal"
            name="username"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.username}
            variant="outlined"
          />
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

          <TextField
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            autoComplete="off"
            fullWidth
            helperText={touched.confirmPassword && errors.confirmPassword}
            label="Confirm Password"
            margin="normal"
            name="confirmPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.confirmPassword}
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
              Register now
            </Button>
          </Box>
          <Typography color="textSecondary" variant="body1">
            Have an account?{' '}
            <Link component={RouterLink} to="/login" variant="h6">
              Login
            </Link>
          </Typography>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
