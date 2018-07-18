import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'

import Errors from '../common/Errors'

export class CreateRestaurantForm extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      name: "",
      address: "",
      submitted: false,
      snackbarOpen: false
    }
  }

  componentDidUpdate(prevProps, prevState) {  
    if(this.state.submitted && !this.props.fetching && prevProps.fetching && this.props.errors.length === 0) {
      this.setState({ 
        snackbarOpen: true, 
        submitted: false,
        name: "",
        address: "", 
      })
    }
  }

  handleInputchange = e => this.setState({ [e.target.name]: e.target.value })

  handleSnackbarClose = () => this.setState({ snackbarOpen: false })

  handleSubmit = () => {
    this.setState({
      submitted: true
    }, () => this.props.createRestaurant({
      name: this.state.name,
      address: this.state.address
    }))
  }

  render() {
    let { errors } = this.props
    errors = errors.filter(err => err.type !== 'NotFoundError')
    return (
      <div className="restaurant-form-container">
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.state.snackbarOpen}
          onClose={this.handleSnackbarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          autoHideDuration={3000}
          message={<span id="message-id">{"Restaurant Created"}</span>}
        />
        <Paper elevation={1} className="restaurant-form">
        <Typography variant="display1"> Create a Restaurant </Typography>
        <TextField
          label="Name"
          fullWidth
          name="name"
          value={this.state.name}
          onChange={this.handleInputchange}
          margin="normal"
          error={errors.length > 0} 
        />
        <TextField
          label="Address"
          fullWidth
          name="address"
          value={this.state.address}
          onChange={this.handleInputchange}
          margin="normal"
          error={errors.length > 0}
        />
        {errors && errors.length > 0 && <Errors errors={errors} />}
        <Button onClick={this.handleSubmit}> Create </Button>
        </Paper>
      </div>
    )
  }
}

export default CreateRestaurantForm