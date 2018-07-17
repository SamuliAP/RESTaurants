import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Errors from '../common/Errors'

export class CreateRestaurantForm extends Component {

  state = {
    name: "",
    address: ""
  }

  handleInputchange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = () => {
    this.props.createRestaurant({
      name: this.state.name,
      address: this.state.address
    })
  }

  render() {
    const { errors } = this.props
    return (
      <div className="restaurant-form-container">
        <Paper elevation={1} className="restaurant-form">
        <Typography variant="display1"> Create a Restaurant </Typography>
        <TextField
          label="Name"
          fullWidth
          name="name"
          value={this.state.name}
          onChange={this.handleInputchange}
          margin="normal"
        />
        <TextField
          label="Address"
          fullWidth
          name="address"
          value={this.state.address}
          onChange={this.handleInputchange}
          margin="normal"
        />
        {errors && errors.length > 0 && <Errors errors={errors} />}
        <Button onClick={this.handleSubmit}> Create </Button>
        </Paper>
      </div>
    )
  }
}

export default CreateRestaurantForm