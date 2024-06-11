import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import ComponentWrapper from 'sections/components-overview/ComponentWrapper';
import ComponentSkeleton from 'sections/components-overview/ComponentSkeleton';
import EnhancedTable from 'sections/dashboard/TransactionTable';
import { Button, Dialog, DialogTitle } from '@mui/material';
import { ReceiveSquare, Send2 } from 'iconsax-react';
import Send from 'components/cards/statistics/Send';
import Deposit from 'components/cards/statistics/Deposit';
import { useEffect, useState } from 'react';
import axios from 'axios';

// ===============================|| COLOR BOX ||=============================== //

function ColorBox({ bgcolor, title, data, dark, main }) {
  return (
    <Card sx={{ '&.MuiPaper-root': { borderRadius: '0px' } }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 2.5,
          bgcolor,
          color: dark ? 'secondary.700' : '#ffffff',
          border: main ? '1px dashed' : '1px solid transparent'
        }}
      >
        {title && (
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item>
              {data && (
                <Stack spacing={0.75} alignItems="center">
                  <Typography variant="subtitle2">{data.label}</Typography>
                  <Typography variant="subtitle1">{data.color}</Typography>
                </Stack>
              )}
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" color="inherit">
                {title}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Card>
  );
}

ColorBox.propTypes = {
  bgcolor: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.object,
  dark: PropTypes.bool,
  main: PropTypes.bool
};

// ===============================|| COMPONENTS - COLOR ||=============================== //

export default function ComponentColor() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [name, setName] = useState('');
  const [transactions, setTransactions] = useState([]);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('https://zamper-server.onrender.com/').then((res) => {
      if (res.data.Status === 'Success') {
        setName(res.data.user);
      }
    });
  }, []);
  const user_id = name?.user?.user_id;
  useEffect(() => {
    if (user_id) {
      axios.get(`https://zamper-server.onrender.com/transactions/${user_id}`).then((res) => {
        if (res.data.Status === 'Success') {
          setTransactions(res.data.transactions);
        }
      });
    }
  }, [user_id]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  return (
    <ComponentSkeleton>
      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} lg={12}>
            <MainCard>
              <Stack>
                <Grid display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: '10px' }}>
                  <Button size="sm" style={{ border: '1px solid #8383F6' }} onClick={handleOpen}>
                    <Send2 />
                    Send
                  </Button>
                  <Button size="sm" color="primary" style={{ border: '1px solid #8383F6' }} onClick={handleOpen1}>
                    <ReceiveSquare />
                    Deposit
                  </Button>
                </Grid>
                <EnhancedTable user_id={user_id} transactions={transactions} />
              </Stack>
            </MainCard>
          </Grid>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ fontWeight: 'bold' }}>Transfer</DialogTitle>
            <Send onClose={handleClose} user_id={user_id} />
          </Dialog>
          <Dialog open={open1} onClose={handleClose1}>
            <DialogTitle sx={{ fontWeight: 'bold' }}>Deposit</DialogTitle>
            <Deposit onClose={handleClose} user_id={user_id} />
          </Dialog>
        </Grid>
      </ComponentWrapper>
    </ComponentSkeleton>
  );
}
