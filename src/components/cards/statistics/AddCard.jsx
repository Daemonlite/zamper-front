// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import axios from 'axios';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import useScriptRef from 'hook/useScriptRef';

// ============================|| JWT - REGISTER ||============================ //

export default function AddCard({ onClose, user_id }) {
  const scriptedRef = useScriptRef();

  return (
    <Box sx={{ mx: 'auto', maxWidth: 400, padding: '20px' }}>
      <Formik
        initialValues={{
          name: '',
          number: '',
          expiry: '',
          cvc: ''
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Card Name is required'),
          number: Yup.string().max(255).required('Card number is required'),
          expiry: Yup.string().max(255).required('Expiry Date is required'),
          cvc: Yup.string().max(255).required('CVC is required')
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          try {
            const payload = {
              user_id,
              name: values.name,
              number: values.number,
              expiry: values.expiry,
              cvc: values.cvc
            };
            axios
              .post('https://zamper-server.onrender.com/addCard', payload)
              .then((res) => {
                if (res.data.Status === 'Success') {
                  dispatch(
                    openSnackbar({
                      open: true,
                      message: (
                        <Stack>
                          <Typography variant="body2">{res.data.Status}, Card added successfully</Typography>
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
            onclose();
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
            onClose();
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name-card">Card Name*</InputLabel>
                  <OutlinedInput
                    id="name-card"
                    type="text"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John Doe"
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  />
                </Stack>
                {touched.name && errors.name && (
                  <FormHelperText error id="helper-text-name-card">
                    {errors.name}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="number-card">Card Number*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.number && errors.number)}
                    id="number-card"
                    type="text"
                    value={values.number}
                    name="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="41xxxxxxxxxxx"
                    inputProps={{}}
                  />
                </Stack>
                {touched.number && errors.number && (
                  <FormHelperText error id="helper-text-number-card">
                    {errors.number}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="number-card">Expiry*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.expiry && errors.expiry)}
                    id="expiry-signup"
                    type="text"
                    value={values.expiry}
                    name="expiry"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="10/25"
                    inputProps={{}}
                  />
                </Stack>
                {touched.expiry && errors.expiry && (
                  <FormHelperText error id="helper-text-expiry-card">
                    {errors.expiry}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="cvc-signup">CVC*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.cvc && errors.cvc)}
                    id="cvc-login"
                    type="text"
                    value={values.cvc}
                    name="cvc"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="736"
                    inputProps={{}}
                  />
                </Stack>
                {touched.cvc && errors.cvc && (
                  <FormHelperText error id="helper-text-cvc-signup">
                    {errors.cvc}
                  </FormHelperText>
                )}
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid container direction={'row'} justifyContent="space-between" item xs={12}>
                <AnimateButton>
                  <Button disableElevation onClick={onClose} fullWidth size="large" type="submit" variant="contained" color="secondary">
                    Cancel
                  </Button>
                </AnimateButton>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Add Card
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
