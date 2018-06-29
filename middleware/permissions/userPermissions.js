const { User }  = require('../../models')
const { error } = require('../../controllers/apiControllers/responses')

// Check whether session user is admin
exports.isAdmin = (req, res, next) => {
  User.findById(req.session.user, (err, user) => {

    if(err || !user || user.role !== 'admin') { 
      return error.create(res, next, error.type.UNAUTHORIZED) 
    }
    
    return next()
  })
}

// Check whether URI parameter 'id' is the same as the current session user id
exports.uriIdIsUser = (req, res, next) => 
  req.params.id === req.session.user
    ? next()
    : error.create(res, next, error.type.UNAUTHORIZED) 


// Check whether URI parameter 'id' is the same as the current session user id OR current session user is admin
exports.IsAdminOrUriIdIsUser = (req, res, next) => 
  req.params.id === req.session.user
    ? next()
    : isAdmin(req, res, next)