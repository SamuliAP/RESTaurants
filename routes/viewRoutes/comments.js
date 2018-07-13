const express = require('express')
const router  = express.Router()

const { commentsViewController } = require('../../controllers')

router.post('/comments', commentsViewController.redirectToRestaurantComments)
router.post('/comments/:id/delete', commentsViewController.redirectToRestaurantComments)
module.exports = router