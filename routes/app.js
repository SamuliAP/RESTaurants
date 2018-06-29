const express = require('express')
const router  = express.Router()

const { render } = require('../controllers/dispatchers')

const notFound = router.use('/', (req,res,next) => {
  // create response only if one has not yet been created
  if(res.locals.view === undefined) {
    res.locals.view = "notFound"
  }
  next()
})

// app route stack, meant for rendering to hbs
module.exports = [
  require('./routes'),
  require('./viewRoutes'),
  notFound,
  render
]