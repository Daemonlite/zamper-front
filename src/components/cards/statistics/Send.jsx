import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';
import AnimateButton from 'components/@extended/AnimateButton';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { openSnackbar } from 'store/reducers/snackbar';
import useScriptRef from 'hook/useScriptRef';
import OTPDialog from './Otp';
import { Dialog } from '@mui/material';

export default function Send({ onClose, user_id, updateBalance }) {
  const scriptedRef = useScriptRef();
  const dispatch = useDispatch();
  const [newBalance, setNewBalance] = useState(null);
  console.log('🚀 ~ Send ~ newBalance:', newBalance);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [transactionPayload, setTransactionPayload] = useState();
  console.log('🚀 ~ Send ~ transactionPayload:', transactionPayload);
  const [loading, setLoading] = useState(false);

  const sendOtp = async (user_id) => {
    try {
      setLoading(true); // Start loading spinner
      const response = await axios.post('https://zamper-server.onrender.com/sendOtp', { user_id });
      setLoading(false); // Stop loading spinner
      if (response.data.Status === 'Success') {
        setEmail(response.data.email);
        setOtpDialogOpen(true);
      } else {
        dispatch(
          openSnackbar({
            open: true,
            message: (
              <Stack>
                <Typography variant="body2">{response.data.Error}</Typography>
              </Stack>
            ),
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            variant: 'alert',
            alert: { color: 'error' },
            close: true
          })
        );
      }
    } catch (error) {
      setLoading(false); // Stop loading spinner
      dispatch(
        openSnackbar({
          open: true,
          message: (
            <Stack>
              <Typography variant="body2">{error.message}</Typography>
            </Stack>
          ),
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: { color: 'error' },
          close: true
        })
      );
    }
  };

  const handleOtpDialogClose = () => {
    setOtpDialogOpen(false);
    onClose(); // Close the Send component only after OTP dialog closes
  };

  return (
    <Box sx={{ mx: 'auto', maxWidth: 400, padding: '20px' }}>
      <Formik
        initialValues={{
          amount: '',
          receiver: '',
          description: '',
          wallet_address: '',
          coin: '',
          network: ''
        }}
        validationSchema={Yup.object().shape({
          amount: Yup.string().max(255).required('Amount is required'),
          receiver: Yup.string().max(255).required('Receiver is required'),
          description: Yup.string().max(255).required('Description is required')
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          try {
            const payload = {
              user_id,
              amount: values.amount,
              receiver: values.receiver,
              description: values.description
            };
            setTransactionPayload(payload);
            const response = await axios.post('https://zamper-server.onrender.com/Send', payload);
            if (response.data.Status === 'Success') {
              await sendOtp(user_id);
              setNewBalance(response.data.newBalance);
              updateBalance(response.data.newBalance);
              dispatch(
                openSnackbar({
                  open: true,
                  message: (
                    <Stack>
                      <Typography variant="body2">{response.data.Status}, Transaction added successfully</Typography>
                    </Stack>
                  ),
                  anchorOrigin: { vertical: 'top', horizontal: 'right' },
                  variant: 'alert',
                  alert: { color: 'success' },
                  close: true
                })
              );
            } else {
              dispatch(
                openSnackbar({
                  open: true,
                  message: (
                    <Stack>
                      <Typography variant="body2">{response.data.Error}</Typography>
                    </Stack>
                  ),
                  anchorOrigin: { vertical: 'top', horizontal: 'right' },
                  variant: 'alert',
                  alert: { color: 'error' },
                  close: true
                })
              );
            }
          } catch (error) {
            dispatch(
              openSnackbar({
                open: true,
                message: (
                  <Stack>
                    <Typography variant="body2">{error.message}</Typography>
                  </Stack>
                ),
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: { color: 'error' },
                close: true
              })
            );
            if (scriptedRef.current) {
              setStatus({ success: false });
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
                  <InputLabel htmlFor="amount-card">Amount*</InputLabel>
                  <OutlinedInput
                    id="amount-card"
                    type="text"
                    value={values.amount}
                    name="amount"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="$1260"
                    fullWidth
                    error={Boolean(touched.amount && errors.amount)}
                  />
                </Stack>
                {touched.amount && errors.amount && (
                  <FormHelperText error id="helper-text-amount-card">
                    {errors.amount}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="receiver-card">Receiver*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.receiver && errors.receiver)}
                    id="receiver-card"
                    type="text"
                    value={values.receiver}
                    name="receiver"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John Kiki"
                    inputProps={{}}
                  />
                </Stack>
                {touched.receiver && errors.receiver && (
                  <FormHelperText error id="helper-text-receiver-card">
                    {errors.receiver}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="description-card">Description*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.description && errors.description)}
                    id="description-signup"
                    type="text"
                    value={values.description}
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder=""
                    inputProps={{}}
                  />
                </Stack>
                {touched.description && errors.description && (
                  <FormHelperText error id="helper-text-description-card">
                    {errors.description}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {loading ? <CircularProgress size={24} /> : 'Send'}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <Dialog open={otpDialogOpen} onClose={handleOtpDialogClose} aria-labelledby="otp-dialog-title">
        <OTPDialog onClose={handleOtpDialogClose} email={email} user_id={user_id} />
      </Dialog>
    </Box>
  );
}
