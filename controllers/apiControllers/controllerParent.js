// Parent controller for abstraction, 
// should be used for basic CRUD -operations via database model injection

const { error, success } = require('./responses')

// Find all model documents
// --
// QueryParams must be located in the URI params (req.params)
// QueryParam format is { queryKey: req.params key }
// e.g. with queryParams = { attribute: 'attributeId' }
// converts to { attribute: req.params.attributeId }
exports.findAll = (Model, queryParams = {}) => (req, res, next) => {

  let query = {}
  for(key of Object.keys(queryParams)) {
    query[key] = req.params[queryParams[key]]
  }

  Model.find(query, (err, data) => {
    if(err)              { return error.create(req, res, next, error.type.MONGOOSE, err) } 
    else if(!data || 
      data.length === 0) { return error.create(req, res, next, error.type.NOTFOUND) } 
    else                 { return success.create(req, res, next, success.type.OK, data._doc) }
  })
}

// Find a model document by id fetched from the URI parameter "id"
exports.findById = Model => (req, res, next) => {
  Model.findById(req.params.id, (err, data) => {
    if(err)        { return error.create(req, res, next, error.type.MONGOOSE, err) } 
    else if(!data) { return error.create(req, res, next, error.type.NOTFOUND) } 
    else           { return success.create(req, res, next, success.type.OK, data._doc) }
  })
}

// Create a model document
// --
// props must be located in the request body (req.params)
// props format is { propKey: req.body key }
// e.g. with props = { attribute: 'attributeId' }
// converts to { attribute: req.body.attributeId }
exports.create = (Model, props = {}) => (req, res, next) => {
  
  let params = {}
  for(key of Object.keys(props)) {
    params[key] = req.body[props[key]]
  }

  Model.create(params, (err, data) => {
    if(err)              { return error.create(req, res, next, error.type.MONGOOSE, err) }
    else if(!data || 
      data.length === 0) { return error.create(req, res, next, error.type.SERVER) }  
    else                 { return success.create(req, res, next, success.type.CREATED, data._doc) }
  })
}

// Update a model document
// -- 
// props must be located in the request body (req.params)
// props format is { propKey: req.body key }
// e.g. with props = { attribute: 'attributeId' }
// converts to { attribute: req.body.attributeId }
exports.update = (Model, props = {}) => (req, res, next) => {

  let params = {}
  for(key of Object.keys(props)) {
    params[key] = req.body[props[key]]
  }
  
  Model.findByIdAndUpdate(req.params.id, params, {
    new: true,
    runValidators: true,
    context: 'query'
  }, (err, data) => {
    if(err)        { return error.create(req, res, next, error.type.MONGOOSE, err) }
    else if(!data) { return error.create(req, res, next, error.type.NOTFOUND) } 
    else           { return success.create(req, res, next, success.type.OK, data._doc) }
  })
}

// Delete a model document by id fetched from the URI parameter "id"
exports.delete = Model => (req, res, next) => {
  Model.findByIdAndRemove(req.params.id, (err, data) => {
    if(err)        { return error.create(req, res, next, error.type.MONGOOSE, err) }
    else if(!data) { return error.create(req, res, next, error.type.NOTFOUND) } 
    else           { return success.create(req, res, next, success.type.OK, data._doc) }
  })
}