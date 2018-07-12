const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

// unique validator plugin for clearer error messages on unique constraint errors 
const uniqueValidator = require('mongoose-unique-validator');

const restaurantSchema = mongoose.Schema({
  name: {
    type     : String,
    required : '{PATH} is required!',
    unique   : 'Expected {PATH} to be unique. Value: "{VALUE}".'
  },
  address: {
    type     : String,
    required : '{PATH} is required!'
  },
  owner: {
    type     : Schema.Types.ObjectId,
    ref      : 'User',
    required : '{PATH} is required!'
  },
  comments: [{
    type : Schema.Types.ObjectId,
    ref  : 'Comment'
  }]
}, {
  timestamps : {},
  toJSON     : { virtuals: true }
})

// for HATEOAS
restaurantSchema.virtual('links').get(function() {
  return {
    self : `/api/restaurants/${this.id}`,
    all  : `/api/restaurants`
  }
})

restaurantSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Restaurant', restaurantSchema)