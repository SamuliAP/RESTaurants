import React from 'react'
import Button from '@material-ui/core/Button'
import Edit from '@material-ui/icons/Edit'

const EditRestaurantButton = props => {
  const { handleClick } = props
  return (
    <div>
      <Button onClick={handleClick} >
        <Edit/>
      </Button>
    </div>
  )
}

export default EditRestaurantButton
