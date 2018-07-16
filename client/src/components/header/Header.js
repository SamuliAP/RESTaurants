import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Logo from './Logo'
import UserButton from './UserButton'
import CreateUserContainer from './createUser/CreateUserContainer'
import LoginContainer from './login/loginContainer'
import '../../assets/css/header.css'

const Header = props => {
  const { auth, toProfilePage, logout } = props
  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar>
          <Logo />
          {auth && <UserButton toProfilePage={toProfilePage} logout={logout} />}
          {!auth && 
            <div>
              <CreateUserContainer /> 
              <LoginContainer />
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header