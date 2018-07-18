import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { commentsActionCreators } from '../../../store/actions'
import Comments from './Comments'

export class CommentsContainer extends Component {
  
  componentDidMount() {
    this.props.actions.fetchComments()
  }

  postComment = body => this.props.actions.createComment({body})
  deleteComment = id => this.props.actions.deleteComment(id)
  updateComment = (body, id) => this.props.actions.updateComment({body}, id)
  
  render() {
    const { comments, restaurant, errors, user } = this.props
    return <Comments 
      comments={comments} 
      restaurant={restaurant}
      errors={errors}
      postComment={this.postComment}
      deleteComment={this.deleteComment}
      updateComment={this.updateComment}
      user={user}
    />
  }
}

const mapStateToProps = state => ({ ...state.commentsReducer, user: state.sessionReducer.user})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(commentsActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);