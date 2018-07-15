import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Logo from './Logo'
import UserButton from './UserButton'
import CreateUserContainer from './createUser/CreateUserContainer'
import '../../assets/css/header.css'

const Header = props => {
  const { auth } = props
  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar>
          <Logo />
          {auth && <UserButton />}
          {!auth && <CreateUserContainer />}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header