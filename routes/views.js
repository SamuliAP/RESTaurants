const express = require('express')
const router  = express.Router()

const { render } = require('../controllers/dispatchers')

const notFound = router.use('/', (req, res, next) => {
  // create response only if one has not yet been created
  if(res.locals.view === undefined) {
    res.locals.view = "notFound"
  }
  next()
})

// if user isn't autheticated and we're not already rendering login view, redirect to /login
const forceLogin = router.use('/', (req, res, next) => {
  
  // routes /login, /session and /users can be called without system permissions
  if(!req.session || req.session && !req.session.authenticated && req.originalUrl !== '/login' && res.locals.view !== 'login') {
      return res.redirect('/login')
  }
  next()
})

// app route stack, meant for rendering to hbs
module.exports = [
  require('./routes'),
  require('./viewRoutes'),
  forceLogin,
  notFound,
  render
]