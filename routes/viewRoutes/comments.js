const express = require('express')
const router  = express.Router()

const { commentsViewController } = require('../../controllers')

router.post('/comments', commentsViewController.tryRedirectToRestaurantComments)
router.post('/comments/:id/delete', commentsViewController.tryRedirectToRestaurantComments)
router.post('/comments/:id', commentsViewController.redirectToRestaurantComments)
router.get('/comments/:id', commentsViewController.getCommentView)
module.exports = router