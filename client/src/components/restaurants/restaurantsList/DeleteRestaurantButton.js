import React from 'react'
import Button from '@material-ui/core/Button'
import Delete from '@material-ui/icons/Delete'

const DeleteRestaurantButton = props => {
  
  const { handleClick } = props
  return (
    <Button onClick={handleClick}>
      <Delete className="delete"/>
    </Button>
  )
}

export default DeleteRestaurantButton
