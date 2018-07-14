const { User }  = require('../../models')
const { error } = require('../../controllers/apiControllers/responses')

// Check whether session user is admin
isAdmin = (req, res, next) => {
  User.findById(req.session.user.id, (err, user) => {

    if(err || !user || user.role !== 'admin') { 
      return error.create(res, next, error.type.NOTPERMITTED) 
    }
    
    return next()
  })
}

// Check whether URI parameter 'id' is the same as the current session user id
exports.uriIdIsUser = (req, res, next) => 
  req.params.id === req.session.user.id
    ? next()
    : error.create(res, next, error.type.NOTPERMITTED) 


// Check whether URI parameter 'id' is the same as the current session user id OR current session user is admin
exports.IsAdminOrUriIdIsUser = (req, res, next) => {
  req.params.id === req.session.user.id
    ? next()
    : isAdmin(req, res, next)
}


exports.isAdmin = isAdmin