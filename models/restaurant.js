const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const restaurantSchema = mongoose.Schema({
  name: {
    type     : String,
    required : true 
  },
  address: {
    type     : String,
    required : true
  },
  owner: {
    type : Schema.Types.ObjectId,
    ref  : 'User',
    required : true
  }
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

module.exports = mongoose.model('Restaurant', restaurantSchema)