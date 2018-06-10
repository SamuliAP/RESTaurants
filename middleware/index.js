xssMiddleware  = require('./xss')
authMiddleware = require('./authenticate')

module.exports = {
  xssMiddleware,
  authMiddleware
}