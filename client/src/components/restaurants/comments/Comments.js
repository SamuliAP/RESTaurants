import React, { Component } from 'react'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import DeleteCommentButton from './DeleteCommentButton'
import Errors from '../../common/Errors'
import '../../../assets/css/restaurants.css'

export class Comments extends Component {

  state = {
    commentValue: ""
  }

  handleChange = (e) => this.setState({ commentValue: e.target.value })

  postComment = () => {
    this.props.postComment({ 
      comment: this.state.commentValue,
      restaurant: this.props.restaurant
    })
    this.setState({
      commentValue: ""
    })
  }

  deleteComment = id => this.props.deleteComment(id)
    
  

  getDeleteButton = (comment, user) => {
    if(comment.owner._id === user._id || user.role === 'admin') {
      return true
    }
    return false
  }
  render() {
    const { comments, restaurant, errors, user } = this.props
    return (
      <div>
        {comments.map(comment => 
          comment.restaurant === restaurant
            ? (
              <div key={comment.id}>
                <Divider/>
                <ExpansionPanelDetails className="flex-grid">
                <div className="col-11" style={{display: 'inline-flex'}}>
                  <Typography style={{padding: '0 10px'}} variant="subheading" >{comment.owner.email}</Typography> | 
                  <Typography style={{marginTop:"2px",padding: '0 10px'}}>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Typography>
                  <Typography style={{marginTop:"2px"}}>
                    {new Date(comment.updatedAt).toLocaleTimeString()}
                  </Typography>
                </div>
                <div className="col-1">
                {this.getDeleteButton(comment, user) && <DeleteCommentButton comment={comment.id} deleteComment={this.deleteComment}/>}
                </div>
                <Typography className="col-12" style={{wordWrap:'break-word', width: "100%", marginLeft:"11px"}}>{comment.comment}</Typography>
                </ExpansionPanelDetails>
              </div>
            ) : ""
        )}
        <Divider/>
        {errors && errors.length > 0 && <Errors errors={errors}/>}
        <ExpansionPanelDetails className="flex-grid">
          <TextField
            label="Post a comment"
            style={{width:"400px", marginRight: "25px"}}
            value={this.state.commentValue}
            onChange={this.handleChange}
            margin="normal"
            multiline
            className="col-4"
          />
          <div className="col-12"/>
          <div className="col-3"/>
          <Button className="col-1" onClick={this.postComment} style={{width:"100px", height:"40px"}}>Post</Button> 
        </ExpansionPanelDetails>
      </div>
    )
  }
}

export default Comments