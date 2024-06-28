import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project-imports
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const [auth, setAuth] = useState(false);
  console.log('🚀 ~ HeaderContent ~ auth:', auth);
  const [name, setName] = useState('');
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('https://zamper-server.onrender.com/').then((res) => {
      if (res.data.Status === 'Success') {
        setAuth(true);
        setName(res.data.user);
      } else {
        setAuth(false);
      }
    });
  }, []);
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  const fullname = name?.user?.firstname;
  // const fullname = name?.user?.firstname + ' ' + name?.user?.lastname;

  return (
    <>
      {!downLG && <Search />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
      <Typography color="text.primary" variant="body1">{`${greeting}, ${fullname}!`}</Typography>
      <Notification />
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
