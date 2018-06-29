exports.getFrontPage = (req, res, next) => {
  res.locals.view = 'frontPage'
  next()
}