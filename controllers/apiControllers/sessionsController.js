const { User           } = require('../../models')
const { error, success } = require('./responses')
const bcrypt             = require('bcryptjs')

exports.createSession = (req, res, next) => {
  // TODO: basic auth encryption
  let email = req.body.email
  User.findOne({ email }, (err, user) => {
    if(err) {
      req.session.authenticated = false
      return error.create(res, next, error.type.MONGOOSE, err) 
    }
    if(!user || user == null) {
      req.session.authenticated = false
      return error.create(res, next, error.type.UNAUTHORIZED) 
    }
    bcrypt.compare(req.body.password, user.password, (err, status) => {
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

exports.deleteSession = (req, res, next) => {
  req.session.destroy(err => {
    if(err) {
      return error.create(res, next, error.type.SERVER, { message: "Session deletion failed" })
    }
    return success.create(res, next, success.type.OK)
  })
}