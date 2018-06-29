module.exports = (req, res, next) => 
  res.render(res.locals.view, {
    ...res.locals.renderParams,
    authenticated: req.session && req.session.authenticated
  })
