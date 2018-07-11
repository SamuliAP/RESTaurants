const mongoose  = require('mongoose')
const Schema    = mongoose.Schema
const Restaurant = mongoose.model('Restaurant');
const { error } = require('../controllers/apiControllers/responses')

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

// save comments to restaurant
commentSchema.pre('save', function(next){
  var self = this
  let comment = {
    _id: self._id,
    comment: self.comment,
    owner: self.owner
  }

  Restaurant.findByIdAndUpdate( self.restaurant, {
    $push: { comments: comment }
  }, function(err, data) {
    if(err)        { return error.create(res, next, error.type.MONGOOSE, err) } 
    else if(!data) { return error.create(res, next, error.type.NOTFOUND) } 
    else           { next() }   
  })
})

module.exports = mongoose.model('Comment', commentSchema)