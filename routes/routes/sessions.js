const express = require('express')
const router  = express.Router()

const { sessionsController } = require('../../controllers')
const { authMiddleware     } = require('../../middleware')

// ------------------------------------

// POST a new session (log in)
router.post('/session', sessionsController.createSession)

// DELETE an existing user session (log out)
router.delete('/session', authMiddleware.authenticate, sessionsController.deleteSession)

// ------------------------------------

/*
 * semantically incorrect POST routes for hbs templates 
 * since template rendering has limitations when using XHR, and 
 * html <form> only supports GET and POST
 */

// log out
router.post('/logout', authMiddleware.authenticate, sessionsController.deleteSession)

module.exports = router