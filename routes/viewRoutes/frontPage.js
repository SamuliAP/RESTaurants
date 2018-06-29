const express = require('express')
const router  = express.Router()

const { frontPageViewController } = require('../../controllers')

router.get('/', frontPageViewController.getFrontPage)

module.exports = router