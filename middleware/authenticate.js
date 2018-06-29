const { error } = require('../controllers/apiControllers/responses')
const { User }  = require('../models')

// checks whether user is authenticated, and also that user exists
exports.authenticate = (req, res, next) => 
  req.session.authenticated 
    ? userExists(req, res, next)
    : error.create(res, next, error.type.UNAUTHORIZED)


userExists = (req, res, next) => {
  User.findById(req.session.user, (err, user) => {

    // on error / user not found, set authenticated to false and return an error
    if(err || !user) { 
      req.session.authenticated = false
      return error.create(res, next, error.type.UNAUTHORIZED) 
    }

    return next()
  })
}