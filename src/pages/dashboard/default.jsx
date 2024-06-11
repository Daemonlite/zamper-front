import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, Button, Card, Dialog, DialogTitle, DialogActions, DialogContent, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Wallet3, Send2, ReceiveSquare, CloudChange, CloseCircle, Money } from 'iconsax-react';
import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
import EcommerceDataCard1 from 'components/cards/statistics/EcommerceDataCard1';
import RepeatCustomerRate from 'sections/dashboard/RepeatCustomerRate';
import TotalIncome from 'sections/dashboard/SummaryPie';
import Transactions from 'sections/dashboard/Transactions';
import BankDataChart from 'sections/dashboard/BankDataChart1';
import PaymentForm from 'sections/dashboard/CreditCard';
import Send from 'components/cards/statistics/Send';
import Deposit from 'components/cards/statistics/Deposit';
import IconButton from 'components/@extended/IconButton';
import { Image } from 'mui-image';
import Logo from '../../assets/images/users/ThreeGolBank.png';

// import AnimateButton from 'components/@extended/AnimateButton';

export default function DashboardDefault() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [auth, setAuth] = useState(false);
  console.log('🚀 ~ DashboardDefault ~ auth:', auth);
  const [name, setName] = useState('');
  const [card, setCard] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [withdraw, setWithdraw] = useState(false);
  const [transactions, setTransactions] = useState([]);

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

  const user_id = name?.user?.user_id;
  const receiver = name?.user?.firstname + ' ' + name?.user?.lastname;

  useEffect(() => {
    if (user_id) {
      Promise.all([
        axios.get(`https://zamper-server.onrender.com/getCard/${user_id}`),
        axios.get(`https://zamper-server.onrender.com/balance/${user_id}`)
      ])
        .then(([cardRes, balanceRes]) => {
          if (cardRes.data.Status === 'Success') {
            setCard(cardRes.data.cards);
          } else {
            console.log('Error fetching card data');
          }
          if (balanceRes.data.Status === 'Success') {
            setAccount(balanceRes.data.account);
          } else {
            console.log('Error fetching balance data');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [user_id]);

  useEffect(() => {
    if (user_id) {
      axios.get(`https://zamper-server.onrender.com/transactions/${user_id}`).then((res) => {
        if (res.data.Status === 'Success') {
          setTransactions(res.data.transactions);
        }
      });
    }
  }, [user_id]);

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setDialogType(null);
  };

  const handleUpdateBalance = (newBalance) => {
    if (newBalance !== null) {
      setBalance(newBalance);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAccountLocked = account[0]?.status === 'Locked';

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={8} sm={8} lg={4}>
        <EcommerceDataCard title="Primary Account" iconPrimary={<Wallet3 />}>
          {card?.length > 0 && <PaymentForm card={card[0]} />}
        </EcommerceDataCard>
      </Grid>
      <Grid item xs={12} sm={8} lg={4}>
        <EcommerceDataCard title="Total Balance" iconPrimary={<Wallet3 />}>
          <Card
            sx={{
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: '290px',
              height: '180px',
              backgroundColor: '#E0E7FB'
            }}
          >
            <Typography sx={{ fontSize: 32, fontWeight: 'bold' }}>
              $
              {balance?.toLocaleString('en-US', {
                minimumFractionDigits: 3
              }) ||
                account[0]?.balance.toLocaleString('en-US', {
                  minimumFractionDigits: 3
                })}
            </Typography>

            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '50px', margin: '10px 0' }}>
              <Button
                size="sm"
                style={{ border: '1px solid #8383F6' }}
                onClick={() => handleOpenDialog(isAccountLocked ? 'locked' : 'send')}
              >
                <Send2 />
                Send
              </Button>
              <Button
                size="sm"
                color="primary"
                style={{ border: '1px solid #8383F6' }}
                onClick={() => handleOpenDialog(isAccountLocked ? 'locked' : 'deposit')}
              >
                <ReceiveSquare />
                Deposit
              </Button>
            </Grid>
            <Grid>
              <Button size="sm" style={{ border: '1px solid #8383F6' }} onClick={() => setWithdraw(true)}>
                <Money />
                Withdraw
              </Button>
            </Grid>
          </Card>
        </EcommerceDataCard>
      </Grid>
      <Grid item xs={12} sm={8} lg={4}>
        <EcommerceDataCard1
          title="Total Expends"
          color="error"
          iconPrimary={<CloudChange color={theme.palette.error.dark} />}
          percentage={<Typography color="error.dark">{/* <ArrowDown size={16} style={{ transform: 'rotate(45deg)' }} /> */}</Typography>}
        >
          <BankDataChart color={theme.palette.error.dark} transactions={transactions} />
        </EcommerceDataCard1>
      </Grid>

      <Grid item xs={12} md={8}>
        <RepeatCustomerRate />
      </Grid>
      <Grid item xs={12} md={4}>
        <TotalIncome />
      </Grid>
      <Grid item xs={12} md={12}>
        <Transactions />
      </Grid>

      {/* <Dialog open={open && dialogType === 'locked'} onClose={handleCloseDialog} fullWidth maxWidth="sm"> */}
      <Dialog open={withdraw} onClose={() => setWithdraw(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold', backgroundColor: theme.palette.error.main, color: theme.palette.error.contrastText }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Image src={Logo} width={120} />
            <IconButton aria-label="close" color="inherit" onClick={() => setWithdraw(false)}>
              <CloseCircle />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: theme.palette.error.main, color: theme.palette.error.contrastText }}>
          <Typography variant="body1">
            Sorry, you can&#39;t withdraw from this Business Private Account. Kindly contact customer service for assistance.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: theme.palette.error.main }}>
          {/* <Button variant="shadow" size="small" onClick={handleCloseDialog} color="inherit"> */}
          <Button variant="shadow" size="small" onClick={() => setWithdraw(false)} color="inherit">
            Close
          </Button>
          <Button variant="shadow" size="small" component={Link} href="mailto:Three.GloBank@secretay.net" target="_blank">
            Get Support
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open && dialogType === 'send'} onClose={handleCloseDialog}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Transfer</DialogTitle>
        <Send onClose={handleCloseDialog} user_id={user_id} updateBalance={handleUpdateBalance} />
      </Dialog>
      <Dialog open={open && dialogType === 'deposit'} onClose={handleCloseDialog}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Deposit</DialogTitle>
        <Deposit onClose={handleCloseDialog} user_id={user_id} receiver={receiver} updateBalance={handleUpdateBalance} />
      </Dialog>
    </Grid>
  );
}
