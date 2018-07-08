const xssMiddleware = require('./sanitizers/xss')
const noSqlMiddleware = require('./sanitizers/noSql')
const authMiddleware = require('./authenticate')
const inputValidationMiddleware  = require('./inputValidation')
const permissionsMiddleware = require('./permissions')
const bodyManipulationMiddleware = require('./bodyManipulation')

module.exports = {
  xssMiddleware,
  noSqlMiddleware,
  authMiddleware,
  inputValidationMiddleware,
  bodyManipulationMiddleware,
  permissionsMiddleware
}