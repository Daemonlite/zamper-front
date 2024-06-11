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
import { useState } from 'react';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import axios from 'axios';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// ============================|| DEPOSIT - FORM ||============================ //

export default function Deposit({ onClose, user_id, receiver, updateBalance }) {
  const [newBalance, setNewBalance] = useState(null);
  console.log('🚀 ~ Deposit ~ newBalance:', newBalance);

  return (
    <Box sx={{ mx: 'auto', maxWidth: 400, padding: '20px' }}>
      <Formik
        initialValues={{
          amount: '',
          accountNumber: '',
          description: ''
        }}
        validationSchema={Yup.object().shape({
          amount: Yup.string().max(255).required('Amount is required'),
          accountNumber: Yup.string().max(255).required('Account number is required'),
          description: Yup.string().max(255).required('Description is required')
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          try {
            const payload = {
              user_id,
              receiver,
              amount: values.amount,
              accountNumber: values.accountNumber,
              description: values.description
            };

            await axios.post('https://zamper-server.onrender.com/Deposit', payload).then((res) => {
              if (res.data.Status === 'Success') {
                setNewBalance(res.data.newBalance);
                updateBalance(res.data.newBalance);
                dispatch(
                  openSnackbar({
                    open: true,
                    message: (
                      <Stack>
                        <Typography variant="body2">{res.data.Status}, Deposit successful</Typography>
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
            });
            onClose();
          } catch (error) {
            dispatch(
              openSnackbar({
                open: true,
                message: (
                  <Stack>
                    <Typography variant="body2">Error: {error.message}</Typography>
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
            setStatus({ success: false });
            setSubmitting(false);
            onClose();
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
                  <InputLabel htmlFor="accountNumber-card">Account Number*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.accountNumber && errors.accountNumber)}
                    id="accountNumber-card"
                    type="text"
                    value={values.accountNumber}
                    name="accountNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="123456789"
                    inputProps={{}}
                  />
                </Stack>
                {touched.accountNumber && errors.accountNumber && (
                  <FormHelperText error id="helper-text-accountNumber-card">
                    {errors.accountNumber}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="description-card">Description*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.description && errors.description)}
                    id="description-card"
                    type="text"
                    value={values.description}
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Add a description"
                    inputProps={{}}
                  />
                </Stack>
                {touched.description && errors.description && (
                  <FormHelperText error id="helper-text-description-card">
                    {errors.description}
                  </FormHelperText>
                )}
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid container direction="row" justifyContent="space-between" item xs={12}>
                <AnimateButton>
                  <Button disableElevation onClick={onClose} fullWidth size="large" type="button" variant="contained" color="secondary">
                    Cancel
                  </Button>
                </AnimateButton>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Deposit
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
}
