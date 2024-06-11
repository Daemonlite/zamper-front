import { useEffect, useState } from 'react';
import { Alert, Button, Slide, Snackbar } from '@mui/material';

const SlideTransition = (props) => <Slide {...props} direction="up" />;

const Alerts = () => {
  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  const handleClick = (message) => () => {
    setSnackPack((prev) => [...prev, { key: new Date().getTime(), message }]);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  return (
    <>
      <Button onClick={handleClick('Message A')}>Show message A</Button>
      <Button onClick={handleClick('Message B')}>Show message B</Button>
      <Snackbar
        TransitionComponent={SlideTransition}
        TransitionProps={{ onExited: handleExited }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        key={messageInfo ? messageInfo.key : undefined}
        message={messageInfo ? messageInfo.message : undefined}
        onClose={onClose}
        open={open}
      >
        {messageInfo ? (
          <Alert elevation={2} icon={false} onClose={onClose} severity="success">
            {messageInfo ? messageInfo.message : undefined}
          </Alert>
        ) : undefined}
      </Snackbar>
    </>
  );
};

export default Alerts;
