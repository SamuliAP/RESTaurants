const parent   = require('./parentSanitizer')

exports.sanitizeURI  = (req, res, next) => parent.sanitizeURI(req.sanitize)(req, res, next)
exports.sanitizeBody = (req, res, next) => parent.sanitizeBody(req.sanitize)(req, res, next)