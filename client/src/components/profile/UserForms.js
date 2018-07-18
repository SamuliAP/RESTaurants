import React from 'react'
import { Button, TextField, Select, MenuItem, Typography } from '@material-ui/core'

import UserForm from './UserForm'

class UserForms extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      password2: '',
      role: this.props.currentUser.role,
      passMatch: true,
    }
  }

  componentDidUpdate(prevProps, prevState) { 
    if(this.props.currentUser._id !== prevProps.currentUser._id) {
      this.setState({
        email: '',
        password: '',
        password2: '',
        role: this.props.currentUser.role,
        passMatch: true
      })
    }
    if(!this.props.fetching 
      && prevProps.fetching 
      && this.props.passwordErrors.length === 0
      && (this.state.password !== ''
      || this.state.password2 !== '')
    ) {
      this.setState({ 
        password: '',
        password2: '',
        passMatch: true
      })
    }
    if(!this.props.fetching 
      && prevProps.fetching 
      && this.props.emailErrors.length === 0
      && this.state.email !== ''
    ) {
      let newEmail = this.state.email
      this.props.updateCurrentUser({
        ...this.props.currentUser,
        email: newEmail
      })
      this.setState({
        email: ''
      })
    }
    if(!this.props.fetching 
      && prevProps.fetching 
      && this.props.roleErrors.length === 0
      && this.state.role !== ''
    ) {
      let newRole = this.state.role
      this.props.updateCurrentUser({
        ...this.props.currentUser,
        role: newRole
      })
    }
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

  submitUserRole = () => {
    let role = this.state.role
    this.props.updateUserRole({role}, this.props.currentUser._id)
  }
  submitUserEmail = () => {
    let email = this.state.email
    this.props.updateUserEmail({ email }, this.props.currentUser._id)
  }

  submitUserPassword = () => {
    let password = this.state.password
    let password2 = this.state.password2
    if(password === password2) {
      this.props.updateUserPassword({ password }, this.props.currentUser._id)
    } else {
      this.setState({
        passMatch: false
      })
    }
  }

  passMatchErrors = () => {
    if(!this.state.passMatch) {
      return [{ message: "Passwords do not match!" }]
    } else return this.props.passwordErrors || []
  }

  deleteUser = () => {
    this.props.deleteUser(this.props.currentUser._id)
  }

  render(){

    const userRoleInputs = (
      <Select
        style={{margin: "10px 0", width:"120px"}}
        value={this.state.role}
        onChange={this.handleInputChange}
        inputProps={{ name: 'role' }}
      >
        <MenuItem value='admin'>Admin</MenuItem>
        <MenuItem value='manager'>Manager</MenuItem>
        <MenuItem value='basic'>Basic</MenuItem>
      </Select>
    )

    const userEmailInputs = (
      <TextField 
        label="Email"
        name="email"
        placeholder={this.props.currentUser.email}
        onChange={this.handleInputChange}
        value={this.state.email}
        fullWidth
        style={{margin: "10px 0"}}
        error={this.props.emailErrors.length > 0}
      />
    )

    const userPasswordInputs = (
      <div>
        <TextField 
          label="New Password"
          name="password"
          type="password"
          onChange={this.handleInputChange}
          value={this.state.password}
          fullWidth
          style={{margin: "10px 0"}}
          error={this.passMatchErrors().length > 0}
        />
        <TextField 
          label="New Password Again"
          name="password2"
          type="password"
          onChange={this.handleInputChange}
          value={this.state.password2}
          fullWidth
          style={{margin: "10px 0"}}
          error={this.passMatchErrors().length > 0}
        />
      </div>
    )

    return (
      <div className="col-6">
        { this.props.authUser.role === 'admin' &&
          <UserForm
            errors={this.props.roleErrors || []}
            submit={this.submitUserRole} 
            title="Change Role" 
            inputElems={userRoleInputs}
            fetching={this.props.fetching}
            successMessage="Role saved"
          />
        }
        <UserForm
          errors={this.props.emailErrors || []}
          submit={this.submitUserEmail} 
          title="Change Email" 
          inputElems={userEmailInputs }
          fetching={this.props.fetching}
          successMessage="Email saved"
        />
        <UserForm 
          errors={this.passMatchErrors()} 
          submit={this.submitUserPassword} 
          title="Change Password" 
          inputElems={userPasswordInputs}
          fetching={this.props.fetching}
          successMessage="Password saved"
        />
        <div className="user-form">
          <Typography variant="headline" > Delete User </Typography>
          <Typography variant="subheading" > This will also delete all restaurants and comments created by this user. </Typography>
          <Typography> ( GDPR Ahoy! ) </Typography>
          <Button 
            onClick={this.deleteUser} 
            color="primary"
            style={{marginTop: '10px'}}
          >
            Delete User 
          </Button>
        </div>
      </div>
    )
  }
}

export default UserForms
