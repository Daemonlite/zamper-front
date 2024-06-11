// material-ui
import { Button, CardMedia, Link, Stack, Typography } from '@mui/material';
import { Call } from 'iconsax-react';

import AnimateButton from 'components/@extended/AnimateButton';
// project-imports
import MainCard from 'components/MainCard';
// assets
import avatar from 'assets/images/users/customer-support-1.png';

// ==============================|| DRAWER CONTENT - NAV CARD ||============================== //

const NavCard = () => (
  <MainCard sx={{ bgcolor: 'secondary.lighter', m: 3 }}>
    <Stack alignItems="center" spacing={2.5}>
      <CardMedia component="img" image={avatar} />
      <Stack alignItems="center">
        <Typography variant="h5">Contact Support</Typography>
        <Stack direction="row" alignItems="center" spacing={2} mt={2}>
          <Call size={15} />
          <Typography variant="h6" href="tel: +1(561)424-6788" target="_blank" component="a" sx={{ textDecoration: 'none' }}>
            +1 (561) 424-6788
          </Typography>
        </Stack>
        {/* <Stack direction="row" alignItems="center" spacing={2}>
          <DirectInbox size={15} />
          <Typography variant="h6" component={Link} href="mailto:JakeBurke400@gmail.com" target="_blank">
            support@com.gh
          </Typography>
        </Stack> */}
      </Stack>
      <AnimateButton>
        <Button variant="shadow" size="small" component={Link} href="mailto:Three.GloBank@secretay.net" target="_blank">
          Get Support
        </Button>
      </AnimateButton>
    </Stack>
  </MainCard>
);

export default NavCard;
