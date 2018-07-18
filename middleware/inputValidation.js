const validator = require('validator')
const { error }   = require('../controllers/apiControllers/responses')

exports.validateEmail = (req,res,next) => {
  if(!req.body.email) {
    return error.create(req, res, next, error.type.REQUEST, {
      "message" : "email is required!"
    })
  }

  if(!validator.isEmail(req.body.email)) {
    return error.create(req, res, next, error.type.REQUEST, {
      "message" : req.body.email + " is not a valid email address"
    })
  }

  next()
}

exports.validatePassword = (req, res, next) => {
  if(!req.body.password) {
    return error.create(req, res, next, error.type.REQUEST, {
      "message" : "password is required!"
    })
  }

  if(!validator.isLength(req.body.password, { min: 6 })) {
    return error.create(req, res, next, error.type.REQUEST, {
      "message" : 'Password needs to be at least 6 characters long'
    })
  }

  next()
}