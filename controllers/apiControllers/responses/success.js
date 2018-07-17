// much of this seems pointless, but this is done like this for loose couplings
// which leads to much easier future development

successParent = successObject => successObject

ok      = successParent
created = successParent

exports.type = {
  OK: {
    message : ok,
    code    : 200
  },
  CREATED: {
    message : created,
    code    : 201
  }
}

exports.create = (req, res, next, type, successObject = {status: "success"}) => {
  message = type.message(successObject)
  code    = type.code
  
  res.locals.response = {
    code: code,
    message: message
  }
  res.locals.success = true

  next()
}