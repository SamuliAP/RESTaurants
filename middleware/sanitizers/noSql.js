const sanitize = require('mongo-sanitize')
const parent   = require('./parentSanitizer')

exports.sanitizeURI  = parent.sanitizeURI(sanitize)
exports.sanitizeBody = parent.sanitizeBody(sanitize)