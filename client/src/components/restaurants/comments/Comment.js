import React from 'react'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import DeleteCommentButton from './DeleteCommentButton'
import { TextField, Button } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit'

class Comment extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      editingComment: false,
      newComment: this.props.comment.comment
    }
  }
  
  getActionButton = (comment, user) => {
    if(comment.owner._id === user._id || user.role === 'admin') {
      return true
    }
    return false
  }

  initEditComment = () => this.setState({ editingComment: true })

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  submit = () => {
    this.props.updateComment({
      comment: this.state.newComment
    }, this.props.comment._id)
    this.setState({
      editingComment: false
    })
  }
  closeEdit = () => {
    this.setState({
      editingComment: false,
      comment: this.props.comment.comment
    })
  }

  render() {
    const { comment, user, deleteComment } = this.props
    return (
      <div>
        <Divider/>
        <ExpansionPanelDetails className="flex-grid">
        <div className="col-9" style={{display: 'inline-flex'}}>
          <Typography style={{padding: '0 10px'}} variant="subheading" >{comment.owner.email}</Typography> | 
          <Typography style={{marginTop:"2px",padding: '0 10px'}}>
            {new Date(comment.updatedAt).toLocaleDateString()}
          </Typography>
          <Typography style={{marginTop:"2px"}}>
            {new Date(comment.updatedAt).toLocaleTimeString()}
          </Typography>
        </div>
        <div className="col-3" style={{display:'inline-flex'}}>
          {this.getActionButton(comment, user) && 
            <Button onClick={this.initEditComment}> 
              <Edit /> 
            </Button>
          }
          {this.getActionButton(comment, user) && <DeleteCommentButton comment={comment._id} deleteComment={deleteComment}/>}
        </div>
        {!this.state.editingComment && 
          <Typography className="col-8" style={{whiteSpace:'pre-wrap', wordWrap:'break-word', width: "100%", marginLeft:"11px"}}>{comment.comment}</Typography>
        }
        {this.state.editingComment && 
          <div className="col-8">
            <TextField 
              fullWidth
              multiline
              value={this.state.newComment} 
              onChange={this.handleChange} 
              name="newComment" 
            />
            <div className="button-wrapper">
              <Button onClick={this.closeEdit}> Cancel </Button>
              <Button onClick={this.submit} color="primary"> Save </Button>
            </div>
          </div>
        }
        </ExpansionPanelDetails>
      </div>
    )
  }
  

}

export default Comment
