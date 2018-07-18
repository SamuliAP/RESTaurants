import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import UserButtonMenu from './UserButtonMenu'

export class UserButton extends Component {

  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null
    }
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  toProfilePage = () => {
    this.setState({
      anchorEl: null
    }, this.props.toProfilePage)
  }

  logout = () => {
    this.setState({
      anchorEl: null
    }, this.props.logout)
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircle className="header-svg"/>
        </IconButton>
        <UserButtonMenu 
          logout={this.logout}
          toProfilePage={this.toProfilePage}
          handleClose={this.handleClose} 
          anchorEl={anchorEl} 
          open={open}
        />
      </div>
    )
  }
}

export default UserButton

