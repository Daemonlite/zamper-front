import PropTypes from 'prop-types';
// import { useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import ListItemButton from '@mui/material/ListItemButton';

// project-imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
// import IconButton from 'components/@extended/IconButton';
// import MoreIcon from 'components/@extended/MoreIcon';
// import { height } from '@mui/system';

// ==============================|| CHART WIDGET - ECOMMERCE CARD  ||============================== //

export default function EcommerceDataCard({ title, count, percentage, color, iconPrimary, children }) {
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <MainCard>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar variant="rounded" color={color}>
                {iconPrimary}
              </Avatar>
              <Typography variant="subtitle1">{title}</Typography>
            </Stack>
            {/* <IconButton
              color="secondary"
              id="wallet-button"
              aria-controls={open ? 'wallet-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreIcon />
            </IconButton>
            <Menu
              id="wallet-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'wallet-button',
                sx: { p: 1.25, minWidth: 150 }
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <ListItemButton onClick={handleClose}>Today</ListItemButton>
              <ListItemButton onClick={handleClose}>Weekly</ListItemButton>
              <ListItemButton onClick={handleClose}>Monthly</ListItemButton>
            </Menu> */}
          </Stack>
        </Grid>
        <Grid item xs={12} columnGap={8}>
          {/* <Grid></Grid> */}
          <MainCard content={false} border={false} sx={{ bgcolor: 'background.default', height: '200px' }}>
            <Box
              sx={{
                p: 3,
                pb: 1.25,
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                // gap: '30px',
                alignItems: 'center'
                // flexDirection: 'column'
              }}
            >
              <Grid spacing={3} display="flex" justifyContent="center" alignItems="center" flexDirection="column" rowGap={3}>
                <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                  {children}
                </Grid>
                <Grid item xs={5} display="flex" justifyContent="center" alignItems="center">
                  <Box display="flex" justifyContent="center" alignItems="center" gap="70px">
                    <Typography variant="h5">{count}</Typography>
                    {percentage}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </MainCard>
  );
}

EcommerceDataCard.propTypes = {
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.node,
  color: PropTypes.any,
  iconPrimary: PropTypes.node,
  children: PropTypes.any
};
