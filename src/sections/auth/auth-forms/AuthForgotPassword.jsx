import { useNavigate } from 'react-router-dom';

// material-ui
import { Alert, Button, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, Stack } from '@mui/material';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
// import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/@extended/AnimateButton';
import useScriptRef from 'hook/useScriptRef';
import { Eye, EyeSlash } from 'iconsax-react';
import { useState } from 'react';
import axios from 'axios';

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

const AuthForgotPassword = () => {
  const scriptedRef = useScriptRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordd, setShowPasswordd] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPasswordd = () => {
    setShowPasswordd(!showPasswordd);
  };
  const navigate = useNavigate();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          oldPassword: Yup.string().required('Old Password is required'),
          newPassword: Yup.string().required('New Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm Password is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const payload = {
              oldPassword: values.oldPassword,
              newPassword: values.newPassword
            };
            axios.post('https://zamper-server.onrender.com/changePassword', payload).then((res) => {
              if (res.data.Status === 'Success') {
                navigate('/auth/login');
                setSnackbarSeverity('success');
                setSnackbarMessage('Password updated successfully');
              } else {
                setSnackbarSeverity('error');
                setSnackbarMessage('Login failed. Please try again.');
              }
            });
            setSnackbarOpen(true);
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setSnackbarSeverity('error');
            setSnackbarMessage('Login error: ' + error.message);
            setSnackbarOpen(true);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-forgot">Old Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.oldPassword && errors.oldPassword)}
                    id="oldPassword-forgot"
                    type="oldPassword"
                    value={values.oldPassword}
                    name="oldPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Old Password"
                    inputProps={{}}
                  />
                  {touched.oldPassword && errors.oldPassword && (
                    <FormHelperText error id="helper-text-oldPassword-forgot">
                      {errors.oldPassword}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="newPassword-forgot">New Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.newPassword && errors.newPassword)}
                    id="newPassword-forgot"
                    type={showPassword ? 'text' : 'password'}
                    value={values.newPassword}
                    name="newPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter New Password"
                    inputProps={{}}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <Eye /> : <EyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {touched.newPassword && errors.newPassword && (
                    <FormHelperText error id="helper-text-newPassword-forgot">
                      {errors.newPassword}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {values.newPassword && (
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="newPassword-forgot">Confirm Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                      id="confirmPassword-forgot"
                      type="confirmPassword"
                      value={values.confirmPassword}
                      name="confirmPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter New Password"
                      inputProps={{}}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPasswordd}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            color="secondary"
                          >
                            {showPasswordd ? <Eye /> : <EyeSlash />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <FormHelperText error id="helper-text-confirmPassword-forgot">
                        {errors.confirmPassword}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              )}
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    // disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting || !values.newPassword || values.newPassword !== values.confirmPassword}
                  >
                    {' '}
                    Reset Password
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AuthForgotPassword;
