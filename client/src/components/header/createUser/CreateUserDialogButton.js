import React from 'react'
import Button from '@material-ui/core/Button';

const CreateUserDialogButton = props => {
  const { handleClickOpen } = props
  return (
    <Button className="header-content" onClick={ handleClickOpen }>
      Create User
    </Button>
  )
}

export default CreateUserDialogButton