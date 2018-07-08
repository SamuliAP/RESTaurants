exports.createUser = (req, res, next) => {
  res.locals.view = 'login'
  next()
}

exports.getAccountView = (req, res, next) => {
  res.locals.view = 'account'
  next()
}