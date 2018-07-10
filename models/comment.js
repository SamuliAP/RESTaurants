const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const commentSchema = mongoose.Schema({
  comment: {
    type     : String,
    required : '{PATH} is required!'
  },
  restaurant: {
    type     : Schema.Types.ObjectId,
    ref      : 'Restaurant',
    required : '{PATH} is required!'
  },
  owner: {
    type     : Schema.Types.ObjectId,
    ref      : 'User',
    required : '{PATH} is required!'
  }
}, {
  timestamps : {},
  toJSON     : { virtuals: true }
})

// for HATEOAS
commentSchema.virtual('links').get(function() {
  return {
    self : `/api/comments/${this.id}`,
    all  : `/api/comments`
  }
})

module.exports = mongoose.model('Comment', commentSchema)