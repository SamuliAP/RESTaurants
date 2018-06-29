/* Error objects shouls always be presented in an array, containing at least
 * two fields: message and type
 */

errorParent = (errObject, messageDefault, typeDefault) => errObject.errors
// if multiple errors found, map them to an array
? {
    errors: Object.entries(errObject.errors).map(val => ({ 
      message : val[1].message || messageDefault, 
      type    : val[1].name    || typeDefault
    }))
  }
// otherwise just get the error info
: {
    errors: [{
      message : errObject.message || messageDefault, 
      type    : errObject.name    || typeDefault
    }]
  }

mongooseError = errObject => errorParent(
  errObject, 
  'Mongoose Error', 
  'MongoError'
)

serverError = errObject => errorParent(
  errObject,
  "Unidentified server error",
  "ServerError" 
)

requestError = errObject => errorParent(
  errObject,
  "Invalid request",
  "InvalidRequestError" 
)

notFoundError = errObject => errorParent(
  errObject,
  "Not found",
  "NotFoundError"
)

unauthorizedError = errObject => errorParent(
  errObject,
  "Unauthorized",
  "UnauthorizedError"
)


exports.type = {
  MONGOOSE: {
    message : mongooseError,
    code    : 400
  },
  SERVER: {
    message : serverError,
    code    : 500
  },
  REQUEST: {
    message : requestError,
    code    : 400
  },
  NOTFOUND: {
    message : notFoundError,
    code    : 404
  },
  UNAUTHORIZED: {
    message : unauthorizedError,
    code    : 401
  }
}

// errObject example (both properties optional):
// {
//   message: "An error has happened", 
//   type: "ErrorHappenedError"
// }
exports.create = (res, next, type, errObject = {}) => {

  message = type.message(errObject)
  code    = type.code

  res.locals.response = {
    code: code,
    message: message
  }

  res.locals.success = false
  res.locals.renderParams = {
    errors: message.errors
  }

  // skip rest of middleware stack on error
  next('route')
}