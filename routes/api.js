const express = require('express')
const router  = express.Router()

const { error } = require('../controllers/apiControllers/responses')
const { send  } = require('../controllers/dispatchers') 

// 404 for catching not matched /api routes
const notFound = router.use('/api', (req,res,next) => {
  // create response only if one has not yet been created
  if(res.locals.response === undefined) {
    error.create(res, next, error.type.NOTFOUND)
  }
  next()
})

// the API route stack, meant for sending responses trough HTTP
module.exports = [
  require('./routes'),
  notFound,
  send
]