const express = require('express')
const router  = express.Router()

const { sessionsController } = require('../controllers')
const { xssMiddleware }      = require('../middleware')


router.post('/api/session',
  sessionsController.createSession
)

router.delete('/api/session/:id',
  xssMiddleware.sanitizeURI,
  sessionsController.deleteSession
)

module.exports = router