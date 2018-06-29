exports.login = (req, res, next) => {
  if(res.locals.success) {
    return res.redirect('/')
  } else {
    res.locals.view = 'login'
  }
  next()
  
}

exports.logout = (req, res, next) => {
  return res.redirect('/login')
}

exports.getLoginPage = (req, res, next) => {
  res.locals.view = 'login'
  next()
}