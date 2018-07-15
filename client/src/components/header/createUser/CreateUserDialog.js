import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const CreateUserDialog = props => {
  const { open, handleClose, handleSubmit, handleInputChange } = props

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create User</DialogTitle>
      <DialogContent className="dialog-content">
        <TextField
          name="email"
          autoFocus
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogContent className="dialog-content">
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          margin="dense"
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogContent className="dialog-content">
        <TextField
          label="Password Again"
          type="password"
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateUserDialog
