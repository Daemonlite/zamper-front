import { Typography } from '@mui/material';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import 'react-credit-cards/es/styles.scss';

const PaymentForm = ({ card }) => {
  console.log('🚀 ~ PaymentForm ~ card:', card);

  return (
    <div id="PaymentForm">
      {card && card.number ? (
        <Cards cvc={card.cvc || ''} expiry={card.expiry || ''} focused={''} name={card.name || ''} number={card.number || ''} />
      ) : (
        <Typography>No card found</Typography>
      )}
    </div>
  );
};

export default PaymentForm;
