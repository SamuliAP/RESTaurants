/* Error objects shouls always be presented in an array, containing at least
 * two fields: message and type
 */

module.exports.mongooseError = errObject => errObject.errors
  // if multiple errors found, map them to an array
  ? {
      errors: Object.entries(errObject.errors).map(val => ({ 
        message : val[1].message, 
        type    : val[1].name 
      }))
    }
  // otherwise just get the error info
  : {
      errors: [{
        message : errObject.message ,
        type    : errObject.name 
      }]
    }



/* All error types apart from mongooseError 
 * take message and type as optional parameters
 */

module.exports.serverError = (message, type) => ({
  errors: [{
    message : message || "Unidentified server error",
    type    : type    || "ServerError" 
  }]
})

module.exports.requestError = (message, type) => ({
  errors: [{
    message : message || "Invalid request",
    type    : type    || "InvalidRequestError" 
  }]
})

module.exports.notFoundError = (message, type) => ({
  errors: [{
    message : message || "Not found",
    type    : type    || "NotFoundError" 
  }]
})