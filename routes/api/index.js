const express = require('express')
const router  = express.Router()

const { error } = require('../../controllers/responses')

/*
 * This is the place for /api -level middleware
 */

// 404 for catching not matched /api routes
const notFound = router.use('/api', (req,res,next) => {
  error.send(res, error.type.NOTFOUND)
})

module.exports = [
  require('./users'),
  require('./sessions'),
  require('./restaurants'),
  notFound
]