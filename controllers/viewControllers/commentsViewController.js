exports.redirectToRestaurantComments = (req, res, next) => {
  if(res.locals.success){
    return res.redirect(`/restaurants/${req.body.restaurant}/comments`) 
  }

  res.locals.renderParams['restaurantId'] = req.body.restaurant

  res.locals.view = 'restaurantComments'
  next()
}