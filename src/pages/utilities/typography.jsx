// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// project-imports
import MainCard from 'components/MainCard';
import ComponentWrapper from 'sections/components-overview/ComponentWrapper';
import ComponentSkeleton from 'sections/components-overview/ComponentSkeleton';
import PaymentForm from 'sections/dashboard/CreditCard';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import AddCard from 'components/cards/statistics/AddCard';
import axios from 'axios';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

export default function ComponentTypography() {
  const [open, setOpen] = useState(false);
  // const [formData, setFormData] = useState({
  //   cvc: '',
  //   expiry: '',
  //   focus: '',
  //   name: '',
  //   number: ''
  // });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value
  //   }));
  // };

  const [auth, setAuth] = useState(false);
  console.log('🚀 ~ ComponentTypography ~ auth:', auth);
  const [name, setName] = useState('');
  console.log('🚀 ~ ComponentTypography ~ name:', name);
  const [card, setCard] = useState(null);
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
  useEffect(() => {
    if (user_id) {
      axios.get(`https://zamper-server.onrender.com/getCard/${user_id}`).then((res) => {
        if (res.data.Status === 'Success') {
          setCard(res.data.cards);
        } else {
          setAuth(false);
        }
      });
    }
  }, [user_id]);

  return (
    <ComponentSkeleton>
      <ComponentWrapper>
        <Grid spacing={3}>
          <Grid item xs={12} lg={6}>
            <Stack spacing={3}>
              <MainCard title={<Button onClick={handleOpen}>Add New Card</Button>} codehighlight="true">
                {card?.map((card, index) => (
                  <PaymentForm key={index} card={card} />
                ))}
              </MainCard>
            </Stack>
          </Grid>
        </Grid>
      </ComponentWrapper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Card</DialogTitle>
        <AddCard onClose={handleClose} user_id={user_id} />
      </Dialog>
    </ComponentSkeleton>
  );
}
