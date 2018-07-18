assertSessionUserRole = (req, role) => 
  req.session 
  && req.session.user 
  && req.session.user.role 
  && req.session.user.role === role

module.exports = (req, res, next) => 
  res.render(res.locals.view, {
    
    // response data
    data: {...(res.locals.response && res.locals.response.message)},
    
    // additional render parameters
    ...res.locals.renderParams,

    // authenticated information
    authenticated: req.session && req.session.authenticated || false,

    // user information
    user: {
      ...req.session && req.session.user,
      role: {
        admin   : assertSessionUserRole(req, 'admin'),
        manager : assertSessionUserRole(req, 'manager'),
        basic   : assertSessionUserRole(req, 'basic'),
      }
    },

    // csrf token
    csrfToken: req.csrfToken()
  })
