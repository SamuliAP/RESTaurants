const { User           } = require('../models')
const { error, success } = require('./responses')
const bcrypt             = require('bcryptjs')

exports.createSession = (req, res, next) => {
  let email = req.body.email
  User.findOne({ email }, (err, user) => {
    if(err) {
      req.session.authenticated = false
      return error.send(res, error.type.MONGOOSE, err) 
    }
    if(!user || user == null) {
      req.session.authenticated = false
      return error.send(res, error.type.NOTFOUND) 
    }
    bcrypt.compare(req.body.password, user.password, (err, status) => {
      if(err || !status) { 
        req.session.authenticated = false
        return error.send(res, error.type.UNAUTHORIZED) 
      }
      req.session.authenticated = true
      req.session.user = user.id
      return success.send(res, success.type.OK)
    })
  })
}

exports.deleteSession = (req, res, next) => {
  req.session.destroy(err => {
    if(err) {
      return error.send(res, error.type.SERVER, { message: "Session deletion failed" })
    }
    return success.send(res, success.type.OK)
  })
}