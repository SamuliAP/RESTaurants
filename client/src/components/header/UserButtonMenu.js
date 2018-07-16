import React from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const UserButtonMenu = props => {
  const { handleClose, toProfilePage, logout, anchorEl, open } = props
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
      <MenuItem name="profile" onClick={toProfilePage}>Profile</MenuItem>
      <MenuItem name="logout" onClick={logout}>Logout</MenuItem>
    </Menu>
  )
}

export default UserButtonMenu
