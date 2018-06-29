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

module.exports = router