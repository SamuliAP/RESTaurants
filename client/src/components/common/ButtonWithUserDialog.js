import React, { Component } from 'react'

import UserDialog from './UserDialog'
import FlatButton from './FlatButton'

class ButtonWithUserDialog extends Component {

  state = {
    dialogOpen: false,
    email: "",
    password: ""
  }

  handleClickDialogOpen = () => this.setState({ dialogOpen: true  });
  handleDialogClose     = () => this.setState({ dialogOpen: false });
  handleInputChange     = e  => this.setState({
    [e.target.name]: e.target.value
  })

  // create user
  handleDialogSubmit = () => {
    this.props.submit({
      email: this.state.email,
      password: this.state.password
    })
  }

  render() {
    let { dialogOpen } = this.state
    const { 
      className, 
      buttonClassName, 
      openButtonName, 
      dialogSubmitName,
      dialogErrors,
      dialogLoading
    } = this.props

    dialogOpen = dialogLoading ? true : dialogOpen

    return (
      <div className={className}>
        <FlatButton className={buttonClassName} content={openButtonName} handleClick={this.handleClickDialogOpen} />
        <UserDialog
          errors={dialogErrors}
          title={openButtonName}
          submitName={dialogSubmitName} 
          open={dialogOpen}
          loading={dialogLoading}
          handleClose={this.handleDialogClose} 
          handleSubmit={this.handleDialogSubmit} 
          handleInputChange={this.handleInputChange}  
        />
      </div>
    )
  }
}

export default ButtonWithUserDialog