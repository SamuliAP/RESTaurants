import React from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const UserButtonMenu = props => {
  const { handleClose, anchorEl, open } = props
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
    </Menu>
  )
}

export default UserButtonMenu
