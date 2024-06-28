import {
  Badge,
  Box,
  Button,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  // IconButton as MuiIconButton,
  Link,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
// assets
import { Notification } from 'iconsax-react';
import { useRef, useState } from 'react';

import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
// project-imports
import MainCard from 'components/MainCard';
import { ThemeMode } from 'config';
import Transitions from 'components/@extended/Transitions';
// material-ui
import { useTheme } from '@mui/material/styles';

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',

  transform: 'none'
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const NotificationPage = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const data = [
    {
      subject: 'Security warning',
      message:
        'Be careful about maintaining security and privacy whenever you’re logging into accounts, especially your bank accounts. Keep your username and password out of plain view when logging in, and don’t share your passwords with others.',
      createdat: 'Thu Jun 27 2024 12:52:16 GMT+0000'
    }
  ];
  console.log('🚀 ~ NotificationPage ~ data:', data);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleDialogOpen = (notification) => {
    setSelectedNotification(notification);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedNotification(null);
  };

  const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'secondary.200' : 'secondary.200';
  const iconBackColor = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'secondary.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.5 }}>
      <IconButton
        color="secondary"
        variant="light"
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        size="large"
        sx={{ color: 'secondary.main', bgcolor: open ? iconBackColorOpen : iconBackColor, p: 1 }}
      >
        <Badge badgeContent={data?.length} color="primary" sx={{ '& .MuiBadge-badge': { top: 2, right: 4 } }}>
          <Notification variant="Bold" />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position={matchesXs ? 'top' : 'top-right'} sx={{ overflow: 'hidden' }} in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                borderRadius: 1.5,
                width: '100%',
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 285
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5">Notifications</Typography>
                    <Link href="#" variant="h6" color="primary">
                      Mark all read
                    </Link>
                  </Stack>
                  <List
                    component="nav"
                    sx={{
                      '& .MuiListItemButton-root': {
                        p: 1.5,
                        my: 1.5,
                        border: `1px solid ${theme.palette.divider}`,
                        '&:hover': {
                          bgcolor: 'primary.lighter',
                          borderColor: theme.palette.primary.light
                        },
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    {data?.map((notification) => (
                      <ListItemButton key={notification.id} onClick={() => handleDialogOpen(notification)}>
                        <ListItemAvatar>
                          <Avatar>
                            <Notification />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography variant="h6">{notification.subject}</Typography>}
                          secondary={new Date(notification.createdat).toLocaleString()}
                        />
                        <ListItemSecondaryAction>
                          <Typography variant="caption" noWrap>
                            {new Date(notification.createdat).toLocaleTimeString()}
                          </Typography>
                        </ListItemSecondaryAction>
                      </ListItemButton>
                    ))}
                  </List>
                  <Stack direction="row" justifyContent="center">
                    <Link href="#" variant="h6" color="primary">
                      View all
                    </Link>
                  </Stack>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Notification Details</DialogTitle>
        <DialogContent>
          {selectedNotification && (
            <>
              <Typography variant="h6" style={{ textTransform: 'uppercase', marginBottom: '5px' }}>
                {selectedNotification.subject}
              </Typography>
              <MainCard>
                <Typography variant="body1">{selectedNotification.message}</Typography>
              </MainCard>
              <Typography variant="caption">Received At: {new Date(selectedNotification.createdat).toLocaleString()}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotificationPage;
