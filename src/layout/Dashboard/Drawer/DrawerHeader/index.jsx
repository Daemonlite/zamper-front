import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';

// project-imports
import DrawerHeaderStyled from './DrawerHeaderStyled';
import { Image } from 'mui-image';
import Logo from '../../../../assets/images/users/ThreeGolBank.png';
import { HEADER_HEIGHT } from 'config';

// ==============================|| DRAWER HEADER ||============================== //

export default function DrawerHeader({ open }) {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled
      theme={theme}
      open={open}
      sx={{
        minHeight: HEADER_HEIGHT,
        width: 'inherit',
        paddingTop: '12px',
        paddingBottom: '8px',
        paddingLeft: open ? '24px' : 0
      }}
    >
      {/* <Logo isIcon={!open} sx={{ width: open ? 'auto' : 52, height: 'auto' }} /> */}
      <Image src={Logo} />
      {/* <Box
        component="img"
        sx={{
          height: 100,
          width: 100,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 }
        }}
        alt="The house from the offer."
        src={Logo}
      /> */}
    </DrawerHeaderStyled>
  );
}

DrawerHeader.propTypes = { open: PropTypes.bool };
