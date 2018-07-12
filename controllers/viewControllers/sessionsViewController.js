exports.login = (req, res, next) => {
  if(res.locals.success) {
    return res.redirect('/restaurants')
  } else {
    res.locals.view = 'login'
  }
  next()
}

exports.getLoginView = (req, res, next) => {
  res.locals.view = 'login'
  next()
}