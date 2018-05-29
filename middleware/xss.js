/* URI sanitizer must be added to individual paths,
 * since express doesn't recognize given URI parameters
 * if they are not pattern matched in the route
 * eg: app.use('/', (req, res) => console.log(req.params)) // always prints {}
 */
exports.sanitizeURI = (req, res, next) => {
  req.params = sanitizeObject(req, req.params)
  next()
}

// this can be used as a global middleware
exports.sanitizeBody = (req, res, next) => {
  console.log(req.body)
  req.body = sanitizeObject(req, req.body)
  console.log(req.body)
  next()
}

// sanitizes all object properties and keys recursively
sanitizeObject = (req, obj) => {

  if(Array.isArray(obj)) {
    let tmpArr = []
    for(value of obj) {
      tmpArr.push(sanitizeObject(req, value))
    }
    return tmpArr
  }

  if(typeof obj !== 'object') {
    return req.sanitize(obj)
  }

  let returnObject = {}
  for(key in obj) {
    returnObject[req.sanitize(key)] = sanitizeObject(req, obj[key])
  }

  return returnObject
}