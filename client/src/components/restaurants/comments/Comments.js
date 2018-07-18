import React, { Component } from 'react'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Errors from '../../common/Errors'
import Comment from './Comment'
import '../../../assets/css/restaurants.css'

export class Comments extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      commentValue: ""
    }
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
  
  render() {
    const { comments, restaurant, errors, user, updateComment } = this.props
    return (
      <div>
        <ExpansionPanelDetails className="flex-grid">
          <Typography variant="display1"> Comments </Typography>
        </ExpansionPanelDetails>
        {comments.map(comment => 
          comment.restaurant === restaurant
            ? <Comment 
                key={comment._id} 
                deleteComment={this.deleteComment} 
                comment={comment} 
                user={user}
                updateComment={updateComment} 
              /> 
            : ""
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
          <Button
            color="primary" 
            className="col-1" 
            onClick={this.postComment} 
            style={{width:"100px", height:"40px"}}
          >
            Post
          </Button> 
        </ExpansionPanelDetails>
      </div>
    )
  }
}

export default Comments