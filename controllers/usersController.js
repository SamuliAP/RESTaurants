const { User } = require('../models')
const errors   = require('./utils/errors')
const parent   = require('./controllerParent')

exports.getUsers = parent.findAll(User)

exports.getUser = parent.findById(User)

exports.createUser = parent.create(User, ['email', 'password', 'role'])

exports.updateUser = parent.update(User, ['email', 'password', 'role'])

exports.updateUserEmail = parent.update(User, ['email'])

exports.updateUserPassword = parent.update(User, ['password'])

exports.updateUserRole = parent.update(User, ['role'])

exports.deleteUser = parent.delete(User)