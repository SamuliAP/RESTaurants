const express = require('express')
const router  = express.Router()

const { commentsViewController } = require('../../controllers')

router.post('/comments', commentsViewController.redirectToRestaurantComments)
module.exports = router