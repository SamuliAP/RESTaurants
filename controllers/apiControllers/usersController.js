const { User } = require('../../models')
const parent   = require('./controllerParent')

// get all users
exports.getUsers = parent.findAll(User)

// get user
exports.getUser = parent.findById(User)

// create user
exports.createUser = parent.create(User, {
  email    : 'email'    , 
  password : 'password' , 
  role     : 'role'
})

// update user
exports.updateUser = parent.update(User, {
  email    : 'email'    , 
  password : 'password' , 
  role     : 'role'
})

// update user email
exports.updateUserEmail = parent.update(User, {
  email: 'email'
})

// update user password
exports.updateUserPassword = parent.update(User, { password: 'password' })

// update user role
exports.updateUserRole = parent.update(User, { role: 'role' })

// delete user
exports.deleteUser = parent.delete(User)