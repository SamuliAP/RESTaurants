const { User } = require('../models')
const errors   = require('./utils/errors')

exports.getUsers = (req, res, next) => {
  User.find({}, (err, data) => {
    if(err)              { res.status(400).send(errors.mongooseError(err))  } 
    else if(!data || 
      data.length === 0) { res.status(404).send(errors.notFoundError())     } 
    else                 { res.status(200).send({ data: data })             }
  })
}

exports.getUser = (req, res, next) => {
  User.findById(req.params.id, (err, data) => {
    if(err)        { res.status(400).send(errors.mongooseError(err))  } 
    else if(!data) { res.status(404).send(errors.notFoundError())     } 
    else           { res.status(200).send({ data: data })             }
  })

}

exports.createUser = (req, res, next) => {
  User.create({
    email    : req.body.email,
    password : req.body.password,
    role     : req.body.role
  }, (err, data) => {
    if(err)              { res.status(400).send(errors.mongooseError(err))  }
    else if(!data || 
      data.length === 0) { res.status(500).send(errors.serverError())       }  
    else                 { res.status(201).send({ data: data })             }
  })
}

exports.updateUser = (req, res, next) => {
  
  User.findByIdAndUpdate(req.params.id, {
    email    : req.body.email,
    password : req.body.password,
    role     : req.body.role
  }, { 
    new: true,
    runValidators: true 
  }, (err, data) => {
    if(err)        { res.status(400).send(errors.mongooseError(err))  }
    else if(!data) { res.status(404).send(errors.notFoundError())     } 
    else           { res.status(200).send({ data: data })             }
  })
}

exports.updateUserEmail = (req, res, next) => {
  
  User.findByIdAndUpdate(req.params.id, {
    email: req.body.email
  }, { 
    new: true,
    runValidators: true 
  }, (err, data) => {
    if(err)        { res.status(400).send(errors.mongooseError(err))  }
    else if(!data) { res.status(404).send(errors.notFoundError())     } 
    else           { res.status(200).send({ data: data })             }
  })
}

exports.updateUserPassword = (req, res, next) => {
  
  User.findByIdAndUpdate(req.params.id, {
    password: req.body.password
  }, { 
    new: true,
    runValidators: true 
  }, (err, data) => {
    if(err)        { res.status(400).send(errors.mongooseError(err))  }
    else if(!data) { res.status(404).send(errors.notFoundError())     } 
    else           { res.status(200).send({ data: data })             }
  })
}

exports.updateUserRole = (req, res, next) => {
  
  User.findByIdAndUpdate(req.params.id, {
    role: req.body.role
  }, { 
    new: true,
    runValidators: true 
  }, (err, data) => {
    if(err)        { res.status(400).send(errors.mongooseError(err))  }
    else if(!data) { res.status(404).send(errors.notFoundError())     } 
    else           { res.status(200).send({ data: data })             }
  })
}

exports.deleteUser = (req, res, next) => {
  User.findByIdAndRemove(req.params.id, (err, data) => {
    if(err)        { res.status(400).send(errors.mongooseError(err))  }
    else if(!data) { res.status(404).send(errors.notFoundError())     } 
    else           { res.status(200).send({ data: data })             }
  })
}