const mongoose  = require('mongoose')
const Schema = mongoose.Schema
const Restaurant = mongoose.model('Restaurant');
const User = mongoose.model('User');
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
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    email: String 
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
  User.findById(self.owner._id, (err, user) => {
    if(user) self.owner.email = user.email
    Restaurant.findByIdAndUpdate( self.restaurant, {
      $push: { comments: self }
    }, next)
  })
})

// delete comment from restaurant on remove
commentSchema.pre('findOneAndRemove', function(next) {
  var self = this
  Restaurant.update({}, { 
    $pull: { 
      comments: { 
        _id: self._conditions._id 
      }
    }
  }, { multi: true }, next)
})

module.exports = mongoose.model('Comment', commentSchema)