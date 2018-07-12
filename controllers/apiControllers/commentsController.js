const { Comment } = require('../../models')
const parent      = require('./controllerParent')

// get all comments
exports.getComments = parent.findAll(Comment)

// get a comment
exports.getComment = parent.findById(Comment)

// create a comment
exports.createComment = parent.create(Comment, {
  comment      : 'comment'    , 
  restaurant   : 'restaurant' , 
  "owner._id"  : 'owner'      
})

// update comment
exports.updateComment = parent.update(Comment, { comment: 'comment' })

// delete comment
exports.deleteComment        = parent.delete(Comment)