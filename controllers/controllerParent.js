// Parent controller for abstraction, 
// should be used for basic CRUD -operations via database model injection

const { error, success } = require('./responses')

// Find all model documents
exports.findAll = Model => (req, res, next) => {
  Model.find({}, (err, data) => {
    if(err)              { return error.send(res, error.type.MONGOOSE, err) } 
    else if(!data || 
      data.length === 0) { return error.send(res, error.type.NOTFOUND) } 
    else                 { return success.send(res, success.type.OK, data) }
  })
}

// Find a model document by id fetched from the URI parameter "id"
exports.findById = Model => (req, res, next) => {
  Model.findById(req.params.id, (err, data) => {
    if(err)        { return error.send(res, error.type.MONGOOSE, err) } 
    else if(!data) { return error.send(res, error.type.NOTFOUND) } 
    else           { return success.send(res, success.type.OK, data) }
  })
}

// Create a model document
// --
// Parameters must be located in the request body
// and listed in the 'props' -parameter as an array 
// of object key strings,
// e.g. ['param1', 'param2'...] -> request.body.param1 etc.
exports.create = (Model, props) => (req, res, next) => {
  
  let params = {}
  for(key of props) {
    params[key] = req.body[key]
  }

  Model.create(params, (err, data) => {
    if(err)              { return error.send(res, error.type.MONGOOSE, err) }
    else if(!data || 
      data.length === 0) { return error.send(res, error.type.SERVER) }  
    else                 { return success.send(res, success.type.CREATED, data) }
  })
}

// Update a model document
// -- 
// Parameters must be located in the request body
// and listed in the 'props' -parameter as an array 
// of object key strings, 
// e.g. ['param1', 'param2'...] -> request.body.param1 etc.
exports.update = (Model, props) => (req, res, next) => {

  let params = {}
  for(key of props) {
    params[key] = req.body[key]
  }

  Model.findByIdAndUpdate(req.params.id, params, { 
    new: true,
    runValidators: true 
  }, (err, data) => {
    if(err)        { return error.send(res, error.type.MONGOOSE, err) }
    else if(!data) { return error.send(res, error.type.NOTFOUND) } 
    else           { return success.send(res, success.type.OK, data) }
  })
}

// Delete a model document by id fetched from the URI parameter "id"
exports.delete = Model => (req, res, next) => {
  Model.findByIdAndRemove(req.params.id, (err, data) => {
    if(err)        { return error.send(res, error.type.MONGOOSE, err) }
    else if(!data) { return error.send(res, error.type.NOTFOUND) } 
    else           { return success.send(res, success.type.OK, data) }
  })
}