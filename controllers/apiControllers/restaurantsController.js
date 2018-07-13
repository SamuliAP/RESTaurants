const { Restaurant } = require('../../models')
const { Comment } = require('../../models')
const parent         = require('./controllerParent')

// get all restaurants
exports.getRestaurants = parent.findAll(Restaurant)

// get all restaurant comments
exports.getRestaurantComments = parent.findAll(Comment, {restaurant: 'id'})

// get a restaurant
exports.getRestaurant = parent.findById(Restaurant)

// create a restaurant
exports.createRestaurant = parent.create(Restaurant, {
  name    : 'name'    , 
  address : 'address' , 
  owner   : 'owner'
})

// update a restaurant
exports.updateRestaurant = parent.update(Restaurant, {
  name    : 'name', 
  address : 'address'
})

// update restaurant name
exports.updateRestaurantName = parent.update(Restaurant, { name: 'name'})

// update restaurant adderss
exports.updateRestaurantAddress = parent.update(Restaurant, { address: 'address' })

// delete restaurant
exports.deleteRestaurant = parent.delete(Restaurant)