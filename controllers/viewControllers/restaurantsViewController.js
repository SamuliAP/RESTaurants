exports.getRestaurantCommentsView = (req, res, next) => {
  // give current restaurant id to view
  res.locals.renderParams['restaurantId'] = req.params.id
  res.locals.view = "restaurantComments"
  next()
}

exports.getRestaurantsView = (req, res, next) => {
  res.locals.view = "restaurants"
  next()
}

exports.tryRedirectToRestaurants = (req, res, next) => {
  if(res.locals.success) {
    return res.redirect(`/restaurants`) 
  }
  res.locals.view = "restaurants"
  next()
}