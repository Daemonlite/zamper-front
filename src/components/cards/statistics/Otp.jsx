import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { openSnackbar } from 'store/reducers/snackbar';

export default function OTPDialog({ onClose, email, user_id }) {
  const dispatch = useDispatch();
  const [timeElapsed, setTimeElapsed] = useState(0);
  console.log('🚀 ~ OTPDialog ~ timeElapsed:', timeElapsed);
  const [otpSentAt, setOtpSentAt] = useState(new Date());
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      const timeDiff = Math.floor((new Date() - otpSentAt) / 1000);
      setTimeElapsed(timeDiff);
      setRemainingTime(300 - timeDiff);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpSentAt]);

  const handleOtpSubmit = async (values, { setStatus, setSubmitting }) => {
    try {
      const response = await axios.post('https://zamper-server.onrender.com/verifyOtp', { otp: values.otp, email, user_id });
      if (response.data.Status === 'Success') {
        dispatch(
          openSnackbar({
            open: true,
            message: <Typography variant="body2">OTP verified successfully.</Typography>,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            variant: 'alert',
            alert: { color: 'success' },
            close: true
          })
        );
        onClose(); // Close the OTP dialog after successful verification
      } else {
        dispatch(
          openSnackbar({
            open: true,
            message: <Typography variant="body2">{response.data.Error}</Typography>,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            variant: 'alert',
            alert: { color: 'error' },
            close: true
          })
        );
      }
      setSubmitting(false);
    } catch (error) {
      dispatch(
        openSnackbar({
          open: true,
          message: <Typography variant="body2">{error.message}</Typography>,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: { color: 'error' },
          close: true
        })
      );
      setStatus({ success: false });
      setSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post('https://zamper-server.onrender.com/sendOtp', { user_id });
      if (response.data.Status === 'Success') {
        dispatch(
          openSnackbar({
            open: true,
            message: <Typography variant="body2">OTP resent successfully.</Typography>,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            variant: 'alert',
            alert: { color: 'success' },
            close: true
          })
        );
        setOtpSentAt(new Date());
        setTimeElapsed(0);
        setRemainingTime(300);
      } else {
        dispatch(
          openSnackbar({
            open: true,
            message: <Typography variant="body2">{response.data.Error}</Typography>,
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
          message: <Typography variant="body2">{error.message}</Typography>,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: { color: 'error' },
          close: true
        })
      );
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Enter OTP
      </Typography>
      <Formik
        initialValues={{ otp: '' }}
        validationSchema={Yup.object().shape({
          otp: Yup.string().max(6).required('OTP is required')
        })}
        onSubmit={handleOtpSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              fullWidth
              error={Boolean(touched.otp && errors.otp)}
              id="otp"
              type="text"
              label="OTP"
              value={values.otp}
              name="otp"
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={touched.otp && errors.otp}
              sx={{ mb: 3 }}
            />
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>
              Verify OTP
            </Button>
            {remainingTime > 0 ? (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                Resend OTP in {formatTime(remainingTime)}
              </Typography>
            ) : (
              <Button variant="outlined" color="secondary" onClick={handleResendOtp} fullWidth sx={{ mt: 2 }}>
                Resend OTP
              </Button>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
}
