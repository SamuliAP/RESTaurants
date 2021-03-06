const express = require('express')
const router  = express.Router()

const { error } = require('../controllers/apiControllers/responses')
const { send  } = require('../controllers/dispatchers') 

const routes = require('./routes')

// 404 for catching not matched /api routes
const notFound = (req,res,next) => {
  // create response only if one has not yet been created
  if(res.locals.response === undefined && req.originalUrl) {
    return error.create(req, res, next, error.type.NOTFOUND)
  }
  next()
}

// check for errors created before the main route stack (mainly for csrf-token errors)
const errorCheck = (req, res, next) => {

  if(res.locals.success === false) {
    return send(req, res, next)
  }
  next()
}

// the API route stack, meant for sending responses trough HTTP
router.use('/', errorCheck)
router.use('/', routes)
router.use('/', notFound)

module.exports = [
  router,
  send
]