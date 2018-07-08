exports.getRestaurants = (req, res, next) => {
  if(req.session.authenticated) {
    res.locals.view = "restaurants"
  } else {
    return res.redirect('/login')
  }
  next()
}

exports.createRestaurant = (req, res, next) => {
  if(!res.locals.renderParams.errors) {
    return res.redirect('/restaurants')
  } else {
    res.locals.view = "restaurants"
  }
  next()
}