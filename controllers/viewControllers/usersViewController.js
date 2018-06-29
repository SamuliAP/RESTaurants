exports.createUser = (req, res, next) => {
  res.locals.view = 'login'
  next()
}