import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import MuiPhoneNumber from 'material-ui-phone-number';
// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { Eye, EyeSlash } from 'iconsax-react';
import useScriptRef from 'hook/useScriptRef';
import axios from 'axios';
import { Countries } from './countries';
import { Autocomplete, TextField } from '@mui/material';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
  const [level, setLevel] = useState();
  const scriptedRef = useScriptRef();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  const options = Countries.map((country) => ({
    name: country.name,
    abbr: country.abbr,
    code: country.code
  }));
  const navigate = useNavigate();

  return (
    <Box sx={{ position: 'relative', mt: 4, mx: 'auto', maxWidth: 400 }}>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          contact: '',
          email: '',
          country: null,
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('First Name is required'),
          lastname: Yup.string().max(255).required('Last Name is required'),
          contact: Yup.string().max(255).required('Contact is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          try {
            const payload = {
              firstname: values.firstname,
              lastname: values.lastname,
              contact: values.contact,
              email: values.email,
              country: values.country.name,
              password: values.password
            };
            axios
              .post('https://zamper-server.onrender.com/register', payload)
              .then((res) => {
                // toast.success(res.data.Status, {
                //   autoClose: true,
                //   position: 'top-right'
                // });
                dispatch(
                  openSnackbar({
                    open: true,
                    message: (
                      <Stack>
                        <Typography variant="body2">{res.data.Status}, You have successfully registered</Typography>
                      </Stack>
                    ),
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },

                    variant: 'alert',
                    alert: {
                      color: 'success'
                    },
                    close: true
                  })
                );
                if (res.data.Status === 'Success') {
                  navigate('/auth/login');
                } else {
                  dispatch(
                    openSnackbar({
                      open: true,
                      message: (
                        <Stack>
                          <Typography variant="body2">{res.data.Error}</Typography>
                        </Stack>
                      ),
                      anchorOrigin: { vertical: 'top', horizontal: 'right' },

                      variant: 'alert',
                      alert: {
                        color: 'error'
                      },
                      close: true
                    })
                  );
                }
              })
              .then((err) => console.log('err =>', err));
          } catch (error) {
            dispatch(
              openSnackbar({
                open: true,
                message: (
                  <Stack>
                    <Typography variant="body2">{error}</Typography>
                  </Stack>
                ),
                anchorOrigin: { vertical: 'top', horizontal: 'right' },

                variant: 'alert',
                alert: {
                  color: 'error'
                },
                close: true
              })
            );
            if (scriptedRef.current) {
              setStatus({ success: false });
              // setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                  <OutlinedInput
                    id="firstname-login"
                    type="text"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                </Stack>
                {touched.firstname && errors.firstname && (
                  <FormHelperText error id="helper-text-firstname-signup">
                    {errors.firstname}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="lastname-signup"
                    type="text"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Doe"
                    inputProps={{}}
                  />
                </Stack>
                {touched.lastname && errors.lastname && (
                  <FormHelperText error id="helper-text-lastname-signup">
                    {errors.lastname}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="contact-signup">Contact*</InputLabel>
                  <MuiPhoneNumber
                    defaultCountry={'us'}
                    value={values.contact}
                    onChange={(value) => setFieldValue('contact', value)}
                    sx={{
                      border: 1,
                      borderColor: '#A2ABB3',
                      borderRadius: '6px',
                      padding: '7px',
                      '& .MuiInput-underline:before': {
                        borderBottom: 'none'
                      },
                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottom: 'none'
                      },
                      '& .MuiInput-underline:after': {
                        borderBottom: 'none'
                      }
                    }}
                  />
                </Stack>
                {touched.contact && errors.contact && (
                  <FormHelperText error id="helper-text-contact-signup">
                    {errors.contact}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                    inputProps={{}}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Autocomplete
                    size="large"
                    disableClearable
                    selectOnFocus
                    fullWidth
                    clearOnBlur
                    autoHighlight
                    options={options}
                    getOptionLabel={(option) => option.name}
                    value={values.country}
                    onChange={(event, value) => setFieldValue('country', value)}
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                          loading="lazy"
                          src={`https://flagcdn.com/16x12/${option.abbr.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/32x24/${option.abbr.toLowerCase()}.png 2x, https://flagcdn.com/48x36/${option.abbr.toLowerCase()}.png 3x`}
                          width="16"
                          height="12"
                          alt=""
                        />
                        {option.name} ({option.code})
                      </Box>
                    )}
                    renderInput={(params) => (
                      <Stack spacing={1}>
                        <InputLabel htmlFor="message-type">Country</InputLabel>
                        <TextField size="medium" {...params} name="country" variant="outlined" placeholder="Select Country" />
                      </Stack>
                    )}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country ? errors.country : null}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
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
                    placeholder="******"
                    inputProps={{}}
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password}
                  </FormHelperText>
                )}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Create Account
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      {/* <ToastContainer style={{ position: 'absolute', top: 0, right: 0, Zindex: 9999 }} /> */}
    </Box>
  );
}
