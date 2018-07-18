import React from 'react'
import { Typography, Button, Paper, Snackbar } from '@material-ui/core';

import Errors from '../common/Errors';

class UserForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      snackbarOpen: false
    }
  }

  handleSnackbarClose = () => this.setState({ snackbarOpen: false })

  componentDidUpdate(prevProps, prevState) {  
    if(this.state.submitted && !this.props.fetching && prevProps.fetching && this.props.errors.length === 0) {
      this.setState({ snackbarOpen: true, submitted: false })
    }
  }
  
  submit = () => {
    this.setState({
      submitted: true
    }, this.props.submit)
  }

  render() {
    const { errors, title, inputElems, successMessage } = this.props
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.state.snackbarOpen}
          onClose={this.handleSnackbarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          autoHideDuration={3000}
          message={<span id="message-id">{successMessage}</span>}
        />
        <Paper className="user-form">
          <Typography variant="headline" > {title} </Typography>
          {inputElems}
          {errors && errors.length > 0 &&
            <Errors errors={errors} />
          }
          <div className="button-wrapper">
            <Button onClick={this.submit} color="primary">
              Save
            </Button>
          </div>
        </Paper>
      </div>
    )
  }
  
}

export default UserForm
