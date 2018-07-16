const { error } = require('../controllers/apiControllers/responses')
const { User }  = require('../models')

// creates a new key-value property pair to request.body -object
// NOTE: this middleware could also be done with less abstraction for the 
// context of this application
exports.newBodyProperty = (key, value, req, res, next) => {

  /* Return a request error (400) on trying to overwrite 
   * existing body property. This could also be a server error, but
   * overwrite is more likely caused by a faulty client request.
   *
   * Error is sent because this could still lead to unwanted behaviour e.g.
   * in case of faulty API documentation.
   */
  if(req.body[key] !== undefined) {
    return error.create(req, res, next, error.type.REQUEST, {
      message: `Overwrite error on request body property: ${key}`
    });
  }

  // create a new property with value
  req.body[key] = value
  return next()
}

// Remove a body property completely
exports.removeBodyProperty = key => (req, res, next) => {
  delete req.body[key]
  return next()
}

// Remove a body property conditionally, if user is not admin
exports.removeBodyPropertyIfNotAdmin = key => (req, res, next) => {
  User.findById(req.session.user && req.session.user.id, (err, user) => {

    if(err || !user || user.role !== 'admin') {
      delete req.body[key] 
    }
    
    return next()
  })
}