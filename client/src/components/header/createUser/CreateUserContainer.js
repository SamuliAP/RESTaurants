import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { usersActionCreators } from '../../../store/actions'

import CreateUserDialog from './CreateUserDialog'
import CreateUserDialogButton from './CreateUserDialogButton'

export class CreateUserContainer extends Component { 

  state = {
    dialogOpen: false,
    email: "",
    password: ""
  }

  componentDidMount() {
    this.props.actions.fetchUsers()
  }

  handleClickDialogOpen = () => this.setState({ dialogOpen: true  });
  handleDialogClose     = () => this.setState({ dialogOpen: false });
  handleInputChange     = e  => this.setState({
    [e.target.name]: e.target.value
  })

  // create user
  handleDialogSubmit = () => {
    this.props.actions.createUser({
      email: this.state.email,
      password: this.state.password
    })
  }

  render() {
    console.log(this.props.users)
    console.log(this.props.user)
    const { dialogOpen } = this.state
    return (
      <div>
        <CreateUserDialogButton handleClickOpen={this.handleClickDialogOpen} />
        <CreateUserDialog 
          open={dialogOpen} 
          handleClose={this.handleDialogClose} 
          handleSubmit={this.handleDialogSubmit} 
          handleInputChange={this.handleInputChange}  
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state.usersReducer })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(usersActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserContainer);