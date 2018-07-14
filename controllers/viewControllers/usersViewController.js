exports.createUser = (req, res, next) => {
  res.locals.view = 'login'
  next()
}

exports.getAccountView = (req, res, next) => {
  if(req.body.adminUserDelete && res.locals.success) {
    return res.redirect('/users')
  } else if(req.body.adminUserDelete && !res.locals.success) {
    res.locals.view = 'userManagement'
  } else {
    res.locals.view = 'account'
  }
  next()
}

exports.tryRedirectToAccountView = (req, res, next) => {
  if(res.locals.success) {
    return res.redirect(`/users/${req.params.id}`)
  }
  res.locals.view = "account"
  next()
}

exports.getUsersView = (req, res, next) => {
  res.locals.view = 'userManagement'
  next()
}