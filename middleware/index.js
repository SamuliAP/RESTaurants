xssMiddleware    = require('./sanitizers/xss')
noSqlMiddleware  = require('./sanitizers/noSql')
authMiddleware   = require('./authenticate')

module.exports = {
  xssMiddleware,
  noSqlMiddleware,
  authMiddleware
}