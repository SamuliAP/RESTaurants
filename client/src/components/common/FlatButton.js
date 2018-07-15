import React from 'react'
import Button from '@material-ui/core/Button';

const FlatButton = props => {
  const { content, handleClick, className } = props
  return (
    <Button className={className} onClick={ handleClick }>
      {content}
    </Button>
  )
}

export default FlatButton