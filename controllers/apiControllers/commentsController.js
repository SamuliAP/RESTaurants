const { Comment } = require('../../models')
const parent      = require('./controllerParent')

exports.getComments          = parent.findAll(Comment)
exports.getComment           = parent.findById(Comment)
exports.createComment        = parent.create(Comment, ['comment', 'restaurant', 'owner'])
exports.updateComment        = parent.update(Comment, ['comment'])
exports.deleteComment        = parent.delete(Comment)