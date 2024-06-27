import { useState } from 'react';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// assets
import { Edit2, Logout, Profile } from 'iconsax-react';
import { Chip, Divider, Grid, Typography } from '@mui/material';
import Avatar from 'components/@extended/Avatar';
import avatar1 from 'assets/images/users/avatar-6.png';
import EditUser from 'components/cards/statistics/EditUser';

// Styles for the modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4
};

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export default function ProfileTab({ user, account }) {
  console.log('🚀 ~ ProfileTab ~ name:', user);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if (index === 0) {
      setOpenDialog(true);
    } else if (index === 1) {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
        <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
          <ListItemIcon>
            <Edit2 variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
          <ListItemIcon>
            <Profile variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="View Profile" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 2}>
          <ListItemIcon>
            <Logout variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>

      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="profile-modal-title" aria-describedby="profile-modal-description">
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: '15px' }}>
            <Avatar alt="profile user" src={avatar1} />
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h5" id="profile-modal-title">
                {user?.firstname} {user?.lastname}
              </Typography>
              <Chip label={account?.length > 0 ? `${account[0]?.status} Account` : ''} color="secondary">
                {account?.length > 0 ? `${account[0]?.status} Account` : ''}
              </Chip>
            </Grid>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary" id="profile-modal-description">
            Below are the details of your profile.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              <strong>First Name:</strong> {user?.firstname}
            </Typography>
            <Typography variant="body1">
              <strong>Last Name:</strong> {user?.lastname}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user?.email}
            </Typography>
            <Typography variant="body1">
              <strong>Country:</strong> {user?.country}
            </Typography>
            <Typography variant="body1">
              <strong>Contact:</strong> {user?.contact}
            </Typography>
          </Box>
          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button variant="contained" color="primary" onClick={handleCloseModal}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="edit-profile-dialog-title"
        aria-describedby="edit-profile-dialog-description"
      >
        <DialogTitle id="edit-profile-dialog-title">Edit Profile</DialogTitle>
        <DialogContent>
          <EditUser user={user} onClose={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
}
