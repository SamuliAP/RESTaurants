/* URI sanitizer must be added to individual paths,
 * since express doesn't recognize given URI parameters
 * if they are not pattern matched in the route
 * eg: app.use('/', (req, res) => console.log(req.params)) // always prints {}
 */
exports.sanitizeURI = sanitizer => (req, res, next) => {
  req.params = sanitizeObject(req, req.params, sanitizer)
  return next()
}

// this can be used as a global middleware
exports.sanitizeBody = sanitizer => (req, res, next) => {
  req.body = sanitizeObject(req, req.body, sanitizer)
  return next()
}

// sanitizes all object properties and keys recursively
sanitizeObject = (req, obj, sanitizer) => {

  if(Array.isArray(obj)) {
    let tmpArr = []
    for(value of obj) {
      tmpArr.push(sanitizeObject(req, value, sanitizer))
    }
    return tmpArr
  }

  if(typeof obj !== 'object') {
    return sanitizer(obj)
  }

  let returnObject = {}
  for(key in obj) {
    returnObject[sanitizer(key)] = sanitizeObject(req, obj[key], sanitizer)
  }

  return returnObject
}