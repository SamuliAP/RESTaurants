const express = require('express')
const router  = express.Router()

const { sessionsViewController, frontPageViewController } = require('../../controllers')

router.get('/login', sessionsViewController.getLoginView)

router.post('/session', sessionsViewController.login)

router.post('/logout', sessionsViewController.getLoginView)

module.exports = router