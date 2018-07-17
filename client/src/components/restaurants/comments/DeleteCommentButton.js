import React from 'react'
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';

const DeleteCommentButton = props => {
  const deleteComment = () => {
    props.deleteComment(props.comment)
  }

  return (
    <div>
      <Button onClick={deleteComment}>
        <Delete/>
      </Button> 
    </div>
  )
}

export default DeleteCommentButton
