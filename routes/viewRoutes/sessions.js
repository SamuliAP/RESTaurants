const express = require('express')
const router  = express.Router()

const { sessionsViewController, frontPageViewController } = require('../../controllers')

router.get('/login', sessionsViewController.getLoginPage)

router.post('/session', sessionsViewController.login)

router.post('/logout', sessionsViewController.getLoginPage)

module.exports = router