exports.getFrontPage = (req, res, next) => {
  return res.redirect('/restaurants')
  if(req.session.authenticated) {
    return res.redirect('/restaurants')
  } else {
    return res.redirect('/login')
  }
  next()
}