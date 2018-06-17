const { User }  = require('../../models')
const { error } = require('../../controllers/responses')

// Check whether session user has role, return error otherwise
exports.hasRole = role => (req, res, next) => {
  User.findById(req.session.user, (err, user) => {

    if(err || !user || user.role !== role) { 
      return error.send(res, error.type.UNAUTHORIZED) 
    }
    
    return next()
  })
}

// Check whether session user has role OR user role is admin, return error otherwise
exports.isAdminOrHasRole = role => (req, res, next) => {
  User.findById(req.session.user, (err, user) => {

    if(err || !user || (user.role !== role && user.role !== 'admin')) { 
      return error.send(res, error.type.UNAUTHORIZED) 
    }
    
    return next()
  })
}