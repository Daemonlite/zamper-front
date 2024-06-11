import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

// project-imports
import Drawer from './Drawer';
import Header from './Header';
// import Footer from './Footer';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

import navigation from 'menu-items';
import { dispatch, useSelector } from 'store';
import { openDrawer } from 'store/reducers/menu';
import { DRAWER_WIDTH } from 'config';
import { CircularProgress, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { openSnackbar } from 'store/reducers/snackbar';
import axios from 'axios';
import SessionExpired from 'pages/auth/sessionExpired';

// ==============================|| MAIN LAYOUT ||============================== //

export default function MainLayout() {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
  const { drawerOpen } = useSelector((state) => state.menu);

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openDrawer({ drawerOpen: !matchDownLG }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  const [auth, setAuth] = useState(false);
  console.log('🚀 ~ DashboardDefault ~ auth:', auth);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  console.log('🚀 ~ DashboardDefault ~ name:', name);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get('https://zamper-server.onrender.com/')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setAuth(true);
          setName(res.data.user);
          dispatch(
            openSnackbar({
              open: true,
              message: (
                <Stack>
                  <Typography variant="h5">Welcome, {res.data.user}</Typography>
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
          setAuth(false);
          setMessage(res.data.Error);
          dispatch(
            openSnackbar({
              open: true,
              message: (
                <Stack>
                  <Typography variant="h5">Sorry, {res.data.Error}</Typography>
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
        setLoading(false); // Set loading to false after authentication check
      })
      .catch((error) => {
        setAuth(false);
        setMessage('An error occurred while checking the session', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return auth ? (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />

      <Box component="main" sx={{ width: `calc(100% - ${DRAWER_WIDTH}px)`, flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar sx={{ mt: 'inherit' }} />
        <Container
          sx={{
            position: 'relative',
            minHeight: 'calc(100vh - 110px)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Breadcrumbs navigation={navigation} title />
          <Outlet />
          {/* <Footer /> */}
        </Container>
      </Box>
    </Box>
  ) : (
    <SessionExpired message={message} />
  );
}
