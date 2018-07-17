import React from 'react'
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/DeleteSweep';

const DeleteCommentButton = props => {
  const deleteComment = () => {
    props.deleteComment(props.comment)
  }

  return (
    <div>
      <Button style={{float:"right"}} onClick={deleteComment}>
        <Delete className="delete"/>
      </Button> 
    </div>
  )
}

export default DeleteCommentButton
