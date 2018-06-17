const { error } = require('../controllers/responses')

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
    return error.send(res, error.type.REQUEST, {
      message: `Overwrite error on request body property: ${key}`
    });
  }

  // create a new property with value
  req.body[key] = value
  return next()
}