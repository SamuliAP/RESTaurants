// Parent controller for abstraction, 
// should be used for basic CRUD -operations via database model injection

const { error, success } = require('./responses')

exports.findAll = Model => (req, res, next) => {
  Model.find({}, (err, data) => {
    if(err)              { return error.send(res, error.type.MONGOOSE, err) } 
    else if(!data || 
      data.length === 0) { return error.send(res, error.type.NOTFOUND) } 
    else                 { return success.send(res, success.type.OK, data) }
  })
}

exports.findById = Model => (req, res, next) => {
  Model.findById(req.params.id, (err, data) => {
    if(err)        { return error.send(res, error.type.MONGOOSE, err) } 
    else if(!data) { return error.send(res, error.type.NOTFOUND) } 
    else           { return success.send(res, success.type.OK, data) }
  })
}

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

exports.delete = Model => (req, res, next) => {
  Model.findByIdAndRemove(req.params.id, (err, data) => {
    if(err)        { return error.send(res, error.type.MONGOOSE, err) }
    else if(!data) { return error.send(res, error.type.NOTFOUND) } 
    else           { return success.send(res, success.type.OK, data) }
  })
}