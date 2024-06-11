import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

// project-imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import axios from 'axios';
import { Chip } from '@mui/material';

// ==============================|| TAB PANEL ||============================== //

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// ==============================|| DATA WIDGET - TRANSACTIONS ||============================== //

export default function Transactions() {
  const [value, setValue] = useState(0);
  const [name, setName] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  console.log('🚀 ~ Transactions ~ filteredTransactions:', filteredTransactions);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('https://zamper-server.onrender.com/').then((res) => {
      if (res.data.Status === 'Success') {
        setName(res.data.user);
      }
    });
  }, []);

  useEffect(() => {
    if (name?.user?.user_id) {
      axios.get(`https://zamper-server.onrender.com/transactions/${name.user.user_id}`).then((res) => {
        if (res.data.Status === 'Success') {
          setTransactions(res.data.transactions);
        }
      });
    }
  }, [name]);

  useEffect(() => {
    let filtered = transactions.filter((transaction) => {
      switch (value) {
        case 1:
          return transaction.status === 'Success';
        case 2:
          return transaction.status === 'Pending';
        case 3:
          return transaction.status === 'Failed';
        default:
          return true; // For All Transactions
      }
    });
    setFilteredTransactions(filtered);
  }, [transactions, value]);

  return (
    <MainCard content={false}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ px: 3 }}>
            <Tab label="All Transaction" {...a11yProps(0)} />
            <Tab label="Success" {...a11yProps(1)} />
            <Tab label="Pending" {...a11yProps(2)} />
            <Tab label="Failed" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <List disablePadding sx={{ '& .MuiListItem-root': { px: 3, py: 1.5 } }}>
            {filteredTransactions.map((transaction, index) => (
              <ListItem key={index} divider>
                <ListItemAvatar>
                  <Avatar variant="rounded">{transaction.receiver[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={transaction.receiver} secondary={`#${transaction.id}`} />
                <Stack spacing={0.25} alignItems="flex-end">
                  <Typography variant="subtitle1">{transaction.amount}</Typography>
                  <Typography
                    color={transaction.status === 'Success' ? 'success.main' : transaction.status === 'Failed' ? 'error' : 'warning.main'}
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <Chip label={transaction.type} color={transaction.type === 'Debit' ? 'error' : 'success'} />
                  </Typography>
                </Stack>
              </ListItem>
            ))}
          </List>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <List disablePadding sx={{ '& .MuiListItem-root': { px: 3, py: 1.5 } }}>
            {filteredTransactions.map(
              (transaction, index) =>
                transaction.status === 'Success' && (
                  <ListItem key={index} divider>
                    <ListItemAvatar>
                      <Avatar variant="rounded">{transaction.receiver[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={transaction.receiver} secondary={`#${transaction.id}`} />
                    <Stack spacing={0.25} alignItems="flex-end">
                      <Typography variant="subtitle1">{transaction.amount}</Typography>
                      <Typography color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Chip label={transaction.type} color={transaction.type === 'Debit' ? 'error' : 'success'} />
                      </Typography>
                    </Stack>
                  </ListItem>
                )
            )}
          </List>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <List disablePadding sx={{ '& .MuiListItem-root': { px: 3, py: 1.5 } }}>
            {filteredTransactions.map(
              (transaction, index) =>
                transaction.status === 'Pending' && (
                  <ListItem key={index} divider>
                    <ListItemAvatar>
                      <Avatar variant="rounded">{transaction.receiver[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={transaction.receiver} secondary={`#${transaction.id}`} />
                    <Stack spacing={0.25} alignItems="flex-end">
                      <Typography variant="subtitle1">{transaction.amount}</Typography>
                      <Typography color="warning.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Chip label={transaction.type} color={transaction.type === 'Debit' ? 'error' : 'success'} />
                      </Typography>
                    </Stack>
                  </ListItem>
                )
            )}
          </List>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <List disablePadding sx={{ '& .MuiListItem-root': { px: 3, py: 1.5 } }}>
            {filteredTransactions.map(
              (transaction, index) =>
                transaction.status === 'Failed' && (
                  <ListItem key={index} divider>
                    <ListItemAvatar>
                      <Avatar variant="rounded">{transaction.receiver[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={transaction.receiver} secondary={`#${transaction.id}`} />
                    <Stack spacing={0.25} alignItems="flex-end">
                      <Typography variant="subtitle1">{transaction.amount}</Typography>
                      <Typography color="error" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Chip label={transaction.type} color={transaction.type === 'Debit' ? 'error' : 'success'} />
                      </Typography>
                    </Stack>
                  </ListItem>
                )
            )}
          </List>
        </TabPanel>
      </Box>
    </MainCard>
  );
}

TabPanel.propTypes = { children: PropTypes.node, value: PropTypes.number, index: PropTypes.number, other: PropTypes.any };
