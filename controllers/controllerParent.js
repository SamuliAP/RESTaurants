const errors   = require('./utils/errors')

exports.findAll = Model => (req, res, next) => {
  Model.find({}, (err, data) => {
    if(err)              { res.status(400).send(errors.mongooseError(err))  } 
    else if(!data || 
      data.length === 0) { res.status(404).send(errors.notFoundError())     } 
    else                 { res.status(200).send({ data: data })             }
  })
}

exports.findById = Model => (req, res, next) => {
  Model.findById(req.params.id, (err, data) => {
    if(err)        { res.status(400).send(errors.mongooseError(err))  } 
    else if(!data) { res.status(404).send(errors.notFoundError())     } 
    else           { res.status(200).send({ data: data })             }
  })
}

exports.create = (Model, props) => (req, res, next) => {

  let params = {}
  for(key of props) {
    params[key] = req.body[key]
  }

  Model.create(params, (err, data) => {
    if(err)              { res.status(400).send(errors.mongooseError(err))  }
    else if(!data || 
      data.length === 0) { res.status(500).send(errors.serverError())       }  
    else                 { res.status(201).send({ data: data })             }
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
    if(err)        { res.status(400).send(errors.mongooseError(err))  }
    else if(!data) { res.status(404).send(errors.notFoundError())     } 
    else           { res.status(200).send({ data: data })             }
  })
}

exports.delete = Model => (req, res, next) => {
  Model.findByIdAndRemove(req.params.id, (err, data) => {
    if(err)        { res.status(400).send(errors.mongooseError(err))  }
    else if(!data) { res.status(404).send(errors.notFoundError())     } 
    else           { res.status(200).send({ data: data })             }
  })
}