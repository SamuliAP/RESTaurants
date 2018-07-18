import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { usersActionCreators } from '../../store/actions'

import UserForms from './UserForms'
import UsersList from './UsersList'
import '../../assets/css/profile.css'
import { Typography } from '@material-ui/core';

export class ProfileContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser: this.props.authUser
    }
  }

  componentDidMount() {
    this.props.actions.fetchUsers()
  }

  updateCurrentUser = candidate => {
    if(this.props.users.length > 0) {
      let currentUser = this.props.users.reduce((acc, user) => user._id === candidate._id ? user : acc )
      if(!currentUser || currentUser._id !== candidate._id) {
        this.setState({ currentUser: this.props.authUser })  
      } else {
        this.setState({ currentUser })
      }
    } else {
      this.setState({ currentUser: this.props.authUser })
    }
  }

  updateUserEmail    = (body, id) => this.props.actions.updateUserEmail({body}, id)
  updateUserRole     = (body, id) => this.props.actions.updateUserRole({body}, id)
  updateUserPassword = (body, id) => this.props.actions.updateUserPassword({body}, id)
  deleteUser         = id => {
    this.props.actions.deleteUser(id)
    if(id === this.props.authUser._id) {
      this.props.logout()
    }
  }

  render() {
    const { currentUser } = this.state
    const {authUser, users} = this.props

    return (
      <div>
        <Typography variant="display1" className="title-secondary" > {currentUser.email} </Typography>
        <div className="flex-grid">
          <UserForms 
            currentUser={currentUser}
            authUser={this.props.authUser}
            deleteUser={this.deleteUser}
            updateCurrentUser={this.updateCurrentUser}
            updateUserEmail={this.updateUserEmail} 
            updateUserRole={this.updateUserRole} 
            updateUserPassword={this.updateUserPassword}
            emailErrors={this.props.emailErrors} 
            passwordErrors={this.props.passwordErrors} 
            roleErrors={this.props.roleErrors}
            errors={this.props.errors}
            fetching={this.props.fetching}
            />
          {authUser.role === 'admin' && 
            <UsersList users={users} updateUser={this.updateCurrentUser}/>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state.usersReducer })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(usersActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);