const { User           } = require('../../models')
const { error, success } = require('./responses')
const bcrypt             = require('bcryptjs')

// create session
exports.createSession = (req, res, next) => {

  // handle basic authentication decoding
  let authHeader = req.headers.authorization
  if (authHeader === undefined) {
    res.header('WWW-Authenticate', 'Basic realm="Authorization required"');
    return error.create(res, next, error.type.UNAUTHORIZED)
  }

  let encoded  = authHeader.split(' ')[1]
  let decoded  = new Buffer(encoded, 'base64').toString()
  let email    = decoded.split(':')[0]
  let password = decoded.split(':')[1]

  // authenticate
  User.findOne({ email }, (err, user) => {
    if(err) {
      req.session.authenticated = false
      return error.create(res, next, error.type.MONGOOSE, err) 
    }
    if(!user || user == null) {
      req.session.authenticated = false
      return error.create(res, next, error.type.UNAUTHORIZED) 
    }
    bcrypt.compare(password, user.password, (err, status) => {
      if(err || !status) { 
        req.session.authenticated = false
        return error.create(res, next, error.type.UNAUTHORIZED) 
      }
      req.session.authenticated = true
      req.session.user = user
      return success.create(res, next, success.type.OK)
    })
  })
}

// delete session
exports.deleteSession = (req, res, next) => {
  req.session.destroy(err => {
    if(err) {
      return error.create(res, next, error.type.SERVER, { message: "Session deletion failed" })
    }
    return success.create(res, next, success.type.OK)
  })
}