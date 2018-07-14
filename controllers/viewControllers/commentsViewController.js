exports.tryRedirectToRestaurantComments = (req, res, next) => {
  if(res.locals.success){
    return res.redirect(`/restaurants/${req.body.restaurant}/comments`) 
  }

  res.locals.renderParams['restaurantId'] = req.body.restaurant

  res.locals.view = 'restaurantComments'
  next()
}

exports.getCommentView = (req, res, next) => {
  res.locals.view = 'comment'
  next()
}

exports.redirectToRestaurantComments = (req, res, next) => {
  return res.redirect(`/restaurants/${req.body.restaurant}/comments`) 
}