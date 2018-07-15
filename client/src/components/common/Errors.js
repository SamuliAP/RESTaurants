import React from 'react'
import Paper from '@material-ui/core/Paper';

const Errors = props => {
  const { errors } = props
  return (
    <Paper elevation={1} className="errors">
      {errors.map((err, i) => <Error key={i} error={err}/> )}
    </Paper>
  )
}

const Error = props => {
  const { error } = props
  return (
    <div>
      {error.message}
    </div>
  )
}

export default Errors
