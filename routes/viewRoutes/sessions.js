const express = require('express')
const router  = express.Router()

const { sessionsViewController, frontPageViewController } = require('../../controllers')

router.get('/login', sessionsViewController.getLoginPage)

router.delete('/session', sessionsViewController.logout)

router.post('/session', sessionsViewController.login)

module.exports = router