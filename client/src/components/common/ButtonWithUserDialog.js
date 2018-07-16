import React, { Component } from 'react'

import UserDialog from './UserDialog'
import FlatButton from './FlatButton'

class ButtonWithUserDialog extends Component {

  state = {
    dialogOpen: false,
    submitted: true,
    email: "",
    password: ""
  }

  handleClickDialogOpen = () => this.setState({ dialogOpen: true  });
  handleDialogClose     = () => this.setState({ dialogOpen: false, submitted: false});
  handleInputChange     = e  => this.setState({
    [e.target.name]: e.target.value
  })

  // create user
  handleDialogSubmit = () => {
    this.props.submit({
      email: this.state.email,
      password: this.state.password
    })
    this.setState({
      submitted: true,
      dialogOpen: false
    })
  }

  render() {
    const { dialogOpen, submitted } = this.state
    const { 
      className, 
      buttonClassName, 
      openButtonName, 
      dialogSubmitName,
      dialogErrors,
      dialogLoading
    } = this.props

    let open = dialogLoading 
      ? true 
      : dialogOpen
        ? true
        : submitted
          ? dialogErrors.length > 0
            ? true
            : false
          :false

    return (
      <div className={className}>
        <FlatButton className={buttonClassName} content={openButtonName} handleClick={this.handleClickDialogOpen} />
        <UserDialog
          errors={dialogErrors}
          title={openButtonName}
          submitName={dialogSubmitName} 
          open={open}
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