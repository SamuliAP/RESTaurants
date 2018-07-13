assertSessionUserRole = (req, role) => 
  req.session 
  && req.session.user 
  && req.session.user.role 
  && req.session.user.role === role

module.exports = (req, res, next) => {
  // console.log(res.locals.renderParams)
  res.render(res.locals.view, {
    ...res.locals.renderParams,
    authenticated: req.session && req.session.authenticated || false,
    user: {
      ...req.session && req.session.user,
      role: {
        admin   : assertSessionUserRole(req, 'admin'),
        manager : assertSessionUserRole(req, 'manager'),
        basic   : assertSessionUserRole(req, 'basic'),
      }
    }
  })
}