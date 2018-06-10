const { error } = require('../controllers/responses')

exports.authenticate = (req, res, next) => {
  req.session.authenticated 
    ? next()
    : error.send(res, error.type.UNAUTHORIZED)
}