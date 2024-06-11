import { useState } from 'react';

// material-ui
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import { I24Support, Profile } from 'iconsax-react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal } from '@mui/material';
import { Box } from '@mui/system';

// Styles for the modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};
// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

export default function SettingTab() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if (index === 1) {
      setOpenDialog(true);
    } else if (index === 0) {
      window.location.href = 'mailto:Three.GloBank@secretay.net';
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
        <Link style={{ textDecoration: 'none' }}>
          <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
            <ListItemIcon>
              <I24Support variant="Bulk" size={18} />
            </ListItemIcon>
            <ListItemText primary="Support" />
          </ListItemButton>
        </Link>
        <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
          <ListItemIcon>
            <Profile variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="Account Settings" />
        </ListItemButton>
      </List>
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="profile-modal-title" aria-describedby="profile-modal-description">
        <Box sx={modalStyle}>
          <h2 id="profile-modal-title">Submit Support</h2>
          <p id="profile-modal-description">Submit Support modal.</p>
          {/* Add more content here as needed */}
        </Box>
      </Modal>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="edit-profile-dialog-title"
        aria-describedby="edit-profile-dialog-description"
      >
        <DialogTitle id="edit-profile-dialog-title">Account Settings</DialogTitle>
        <DialogContent>
          <p id="edit-profile-dialog-description">This is the account settings dialog.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
