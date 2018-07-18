import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Errors from './Errors'

const UserDialog = props => {
  const { 
    title, 
    submitName, 
    open, 
    handleClose, 
    handleSubmit, 
    handleInputChange,
    errors
  } = props

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        {errors && errors.length > 0 && 
          <DialogContent className="dialog-content">
            <Errors errors={errors} />
          </DialogContent>
        }
        <DialogContent className="dialog-content">
          <TextField
            name="email"
            autoFocus
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            error={errors.length > 0}
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
            error={errors.length > 0}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {submitName}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UserDialog
