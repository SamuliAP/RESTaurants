const { User           } = require('../../models')
const { error, success } = require('./responses')
const bcrypt             = require('bcryptjs')

exports.getSession = (req, res, next) => {
  // this has already passed authentication, so we'll just return success with session
  return success.create(req, res, next, success.type.OK, req.session && req.session.user)
}

// create session
exports.createSession = (req, res, next) => {

  // handle basic authentication decoding
  let authHeader = req.headers.authorization
  let authPlaceholder = req.body.auth
  if (authHeader === undefined && authPlaceholder === undefined) {
    res.header('WWW-Authenticate', 'Basic realm="Authorization required"');
    return error.create(req, res, next, error.type.UNAUTHORIZED)
  }
  let encoded = ''
  if(authHeader) {
    encoded  = authHeader.split(' ')[1]  
  } else {
    encoded  = authPlaceholder.split(' ')[1]
  }
  
  let decoded  = new Buffer(encoded, 'base64').toString()
  let email    = decoded.split(':')[0]
  let password = decoded.split(':')[1]

  // authenticate
  User.findOne({ email }, (err, user) => {
    if(err) {
      req.session.authenticated = false
      return error.create(req, res, next, error.type.MONGOOSE, err) 
    }
    if(!user || user == null) {
      req.session.authenticated = false
      return error.create(req, res, next, error.type.UNAUTHORIZED) 
    }
    bcrypt.compare(password, user.password, (err, status) => {
      if(err || !status) { 
        req.session.authenticated = false
        return error.create(req, res, next, error.type.UNAUTHORIZED) 
      }
      req.session.authenticated = true
      req.session.user = user
      return success.create(req, res, next, success.type.OK, req.session && req.session.user)
    })
  })
}

// delete session
exports.deleteSession = (req, res, next) => {
  req.session.destroy(err => {
    if(err) {
      return error.create(req, res, next, error.type.SERVER, { message: "Session deletion failed" })
    }
    return success.create(req, res, next, success.type.OK)
  })
}