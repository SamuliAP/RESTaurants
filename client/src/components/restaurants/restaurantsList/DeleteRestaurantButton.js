import React from 'react'
import Button from '@material-ui/core/Button'
import Delete from '@material-ui/icons/Delete'

const DeleteRestaurantButton = props => {
  
  const { deleteRestaurant } = props
  return (
    <Button onClick={deleteRestaurant} style={{float:'right', marginRight: '15px'}}>
      <Delete className="delete"/>
    </Button>
  )
}

export default DeleteRestaurantButton
