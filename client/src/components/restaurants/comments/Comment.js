import React from 'react'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import DeleteCommentButton from './DeleteCommentButton'

export const Comment = props => {

  const getDeleteButton = (comment, user) => {
    if(comment.owner._id === user._id || user.role === 'admin') {
      return true
    }
    return false
  }

  const { comment, user, deleteComment } = props
  return (
    <div>
      <Divider/>
      <ExpansionPanelDetails className="flex-grid">
      <div className="col-10" style={{display: 'inline-flex'}}>
        <Typography style={{padding: '0 10px'}} variant="subheading" >{comment.owner.email}</Typography> | 
        <Typography style={{marginTop:"2px",padding: '0 10px'}}>
          {new Date(comment.updatedAt).toLocaleDateString()}
        </Typography>
        <Typography style={{marginTop:"2px"}}>
          {new Date(comment.updatedAt).toLocaleTimeString()}
        </Typography>
      </div>
      <div className="col-2">
      {getDeleteButton(comment, user) && <DeleteCommentButton comment={comment.id} deleteComment={deleteComment}/>}
      </div>
      <Typography className="col-12" style={{wordWrap:'break-word', width: "100%", marginLeft:"11px"}}>{comment.comment}</Typography>
      </ExpansionPanelDetails>
    </div>
  )

}

export default Comment
