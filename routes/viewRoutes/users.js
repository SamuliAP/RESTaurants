const express = require('express')
const router  = express.Router()

const { usersViewController } = require('../../controllers')
const { authMiddleware } = require('../../middleware')

router.get('/users', usersViewController.getUsersView)
router.post('/users', usersViewController.createUser)
router.post('/users/:id/email', usersViewController.getAccountView)
router.post('/users/:id/password', usersViewController.getAccountView)
router.post('/users/:id/delete', authMiddleware.authenticate, usersViewController.getAccountView)
router.get('/account', usersViewController.getAccountView)

module.exports = router