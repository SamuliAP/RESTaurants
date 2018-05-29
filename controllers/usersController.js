const { User } = require('../models')


exports.getUsers = (req, res, next) => {
  res.locals.query = User.find({})
}
exports.getUser = (req, res, next) => {
  res.locals.query = User.findById(req.params.id)
}
exports.createUser = (req, res, next) => {
  res.locals.query = User.create({
    email    : req.body.name,
    password : req.body.password,
    role     : req.body.role
  })
}
exports.updateUser = (req, res, next) => {
  res.locals.query = User.findByIdAndUpdate(req.params.id, {

    // concat and return objects only if found in req.body
    ...req.body.email    && { email    : req.body.email    },
    ...req.body.password && { password : req.body.password },
    ...req.body.role     && { role     : req.body.role     },
  })
}
exports.deleteUser = (req, res, next) => {
  res.locals.query = User.findByIdAndRemove(req.params.id)
}