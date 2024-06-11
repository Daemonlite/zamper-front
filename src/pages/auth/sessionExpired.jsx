import { Box, Button, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

import { Link } from 'react-router-dom';
// assets
import SessionExpiredImage from 'assets/images/auth/expired.jpg';
// material-ui
import { useTheme } from '@mui/material/styles';

const LOGIN_PATH = '/auth/login';

// ==============================|| ERROR 500 ||============================== //

function SessionExpired({ message }) {
  console.log('🚀 ~ SessionExpired ~ message:', message);
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}
        spacing={3}
      >
        <Grid item xs={12}>
          <Box sx={{ width: 325 }}>
            <img src={SessionExpiredImage} alt="error 500" style={{ height: '100%', width: '100%' }} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Stack justifyContent="center" alignItems="center">
            <Typography align="center" variant={matchDownSM ? 'h2' : 'h1'}>
              Session Expired
            </Typography>
            <Typography color="textSecondary" variant="body2" align="center" sx={{ width: { xs: '73%', sm: '70%' }, mt: 1 }}>
              Please login again
            </Typography>
            <Button component={Link} to={LOGIN_PATH} variant="contained" sx={{ textTransform: 'none', mt: 4 }}>
              Login
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default SessionExpired;
