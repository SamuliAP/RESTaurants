import React from 'react'
import Typography from '@material-ui/core/Typography'

const Title = props => {
  const { title } = props
  return (
    <div className="title">
      <Typography variant="display3"> {title} </Typography>
    </div>
  )
}

export default Title