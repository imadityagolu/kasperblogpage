import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

const GuestLoginModal = ({ open, onClose, name, email, onNameChange, onEmailChange, onSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Guest Login</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={name || ""}
          onChange={onNameChange}
          fullWidth
          required
          margin="dense"
           sx={{
    // override the input padding to MUI default
    '& .MuiInputBase-input': {
      padding: '26.5px 14px !important',
      boxSizing: 'border-box',
    },
  }}
        />
        <TextField
          label="Email"
          name="email"
          value={email || ""}
          onChange={onEmailChange}
          fullWidth
          required
          margin="dense"
           sx={{
    // override the input padding to MUI default
    '& .MuiInputBase-input': {
      padding: '26.5px 14px !important',
      boxSizing: 'border-box',
    },
  }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GuestLoginModal;
