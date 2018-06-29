const express = require('express')
const router  = express.Router()

const { usersViewController } = require('../../controllers')

router.post('/users', usersViewController.createUser)

module.exports = router