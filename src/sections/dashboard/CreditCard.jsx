import { Typography } from '@mui/material';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import 'react-credit-cards/es/styles.scss';

const PaymentForm = ({ card, fullname }) => {
  console.log('🚀 ~ PaymentForm ~ card:', card);

  return (
    <div id="PaymentForm">
      {card && card.number ? (
        <Cards
          cvc={card.cvc || '***'}
          expiry={card.expiry || '01/23'}
          focused={''}
          name={card.name || { fullname }}
          number={card.number || '0000 0000 0000 0001'}
        />
      ) : (
        <Typography>No card found</Typography>
      )}
    </div>
  );
};

export default PaymentForm;
