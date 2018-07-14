const express = require('express')
const router  = express.Router()

const { render } = require('../controllers/dispatchers')
const { error }  = require('../controllers/apiControllers/responses')

const routes     = require('./routes')
const viewRoutes = require('./viewRoutes')

// not found page
const notFound = (req, res, next) => {

  // create response only if one has not yet been created
  if(res.locals.view === undefined) {
    res.locals.view = "notFound"
  }

  next()
}

// if user isn't autheticated and we're not already rendering login view, redirect to /login
const forceLogin = (req, res, next) => {
  // routes /login, /session and /users can be called without system permissions
  if(!req.session || (req.session && !req.session.authenticated && req.originalUrl !== '/login' && res.locals.view !== 'login')) {
    return res.redirect('/login')
  }
  next()
}

// check for errors created before the main route stack
const errorCheck = (req, res, next) => {

  if(res.locals.success === false) {
    res.locals.view = 'login'
    return render(req, res, next)
  }
  next()
}

// initialize renderParams, which is used to send additional information to templates
const initRenderParams = (req, res, next) => {
  res.locals.renderParams = {}
  next()
}

router.use('/', errorCheck)
router.use('/', initRenderParams)
router.use('/', routes)
router.use('/', viewRoutes)
router.use('/', forceLogin)
router.use('/', notFound)

// app route stack, meant for rendering to hbs
module.exports = [
  router,
  render
]