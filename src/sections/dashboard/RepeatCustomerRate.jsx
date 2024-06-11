import { useEffect, useState } from 'react';

// material-ui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import RepeatCustomerChart from './RepeatCustomerChart';
import MainCard from 'components/MainCard';
import axios from 'axios';

// ==============================|| CHART - REPEAT CUSTOMER RATE ||============================== //

export default function RepeatCustomerRate() {
  const [name, setName] = useState('');
  const [transactions, setTransactions] = useState([]);
  console.log('🚀 ~ RepeatCustomerRate ~ transactions:', transactions);

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

  return (
    <MainCard>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Typography variant="h5">Money Flow</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={0.5} sx={{ mt: 1 }}></Stack>
      <RepeatCustomerChart transactions={transactions} />
    </MainCard>
  );
}
